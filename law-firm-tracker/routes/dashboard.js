const express = require('express');
const { getDb } = require('../db/database');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Lawyer dashboard stats
router.get('/lawyer', requireAuth, (req, res) => {
  const db = getDb();
  const userId = req.query.user_id || req.session.userId;
  const isManager = ['manager', 'admin'].includes(req.session.userRole);
  if (!isManager && userId !== req.session.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  const weekStartStr = weekStart.toISOString().split('T')[0];
  const todayStr = now.toISOString().split('T')[0];

  // Today
  const todayStats = db.prepare(`
    SELECT SUM(hours) as hours, SUM(billed_amount) as billed
    FROM time_entries WHERE user_id = ? AND entry_date = ?
  `).get(userId, todayStr);

  // This week
  const weekStats = db.prepare(`
    SELECT SUM(hours) as hours, SUM(billed_amount) as billed,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours
    FROM time_entries WHERE user_id = ? AND entry_date >= ? AND entry_date <= ?
  `).get(userId, weekStartStr, todayStr);

  // This month
  const monthStats = db.prepare(`
    SELECT SUM(hours) as hours, SUM(billed_amount) as billed,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours,
      COUNT(*) as entries
    FROM time_entries WHERE user_id = ? AND entry_date >= ?
  `).get(userId, monthStart);

  // YTD
  const ytdStats = db.prepare(`
    SELECT SUM(hours) as hours, SUM(billed_amount) as billed,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours
    FROM time_entries WHERE user_id = ? AND strftime('%Y', entry_date) = ?
  `).get(userId, String(year));

  // Monthly target
  const monthTarget = db.prepare(`
    SELECT target_hours, target_amount FROM targets
    WHERE user_id = ? AND year = ? AND month = ?
  `).get(userId, year, month);

  const annualTarget = db.prepare(`
    SELECT target_hours, target_amount FROM targets
    WHERE user_id = ? AND year = ? AND month IS NULL
  `).get(userId, year);

  // Daily hours this month (for chart)
  const dailyHours = db.prepare(`
    SELECT entry_date, SUM(hours) as total_hours,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours
    FROM time_entries
    WHERE user_id = ? AND entry_date >= ?
    GROUP BY entry_date ORDER BY entry_date
  `).all(userId, monthStart);

  // Hours by matter (this month)
  const matterBreakdown = db.prepare(`
    SELECT m.name as matter_name, m.matter_number,
      SUM(te.hours) as hours, SUM(te.billed_amount) as billed
    FROM time_entries te JOIN matters m ON te.matter_id = m.id
    WHERE te.user_id = ? AND te.entry_date >= ?
    GROUP BY te.matter_id ORDER BY hours DESC LIMIT 8
  `).all(userId, monthStart);

  // Recent entries
  const recentEntries = db.prepare(`
    SELECT te.*, m.name as matter_name, m.matter_number, c.name as client_name
    FROM time_entries te
    JOIN matters m ON te.matter_id = m.id
    JOIN clients c ON m.client_id = c.id
    WHERE te.user_id = ?
    ORDER BY te.entry_date DESC, te.created_at DESC LIMIT 10
  `).all(userId);

  // Draft entries count
  const draftCount = db.prepare("SELECT COUNT(*) as c FROM time_entries WHERE user_id = ? AND status = 'draft'").get(userId);

  res.json({
    today: todayStats,
    week: weekStats,
    month: monthStats,
    ytd: ytdStats,
    month_target: monthTarget,
    annual_target: annualTarget,
    daily_hours: dailyHours,
    matter_breakdown: matterBreakdown,
    recent_entries: recentEntries,
    draft_count: draftCount.c,
    current_month: month,
    current_year: year,
  });
});

// Management dashboard
router.get('/management', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
  const prevMonthStart = month === 1
    ? `${year - 1}-12-01`
    : `${year}-${String(month - 1).padStart(2, '0')}-01`;
  const prevMonthEnd = new Date(year, month - 1, 0).toISOString().split('T')[0];

  // Firm-wide totals this month
  const monthTotals = db.prepare(`
    SELECT
      SUM(hours) as total_hours,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours,
      SUM(billed_amount) as total_billed,
      COUNT(DISTINCT user_id) as active_lawyers,
      COUNT(*) as total_entries
    FROM time_entries WHERE entry_date >= ?
  `).get(monthStart);

  // Previous month totals
  const prevMonthTotals = db.prepare(`
    SELECT SUM(billed_amount) as total_billed,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours
    FROM time_entries WHERE entry_date >= ? AND entry_date <= ?
  `).get(prevMonthStart, prevMonthEnd);

  // YTD
  const ytdTotals = db.prepare(`
    SELECT SUM(hours) as total_hours,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours,
      SUM(billed_amount) as total_billed
    FROM time_entries WHERE strftime('%Y', entry_date) = ?
  `).get(String(year));

  // Per-lawyer performance this month
  const lawyerPerformance = db.prepare(`
    SELECT u.id, u.full_name, u.title, u.default_hourly_rate,
      COALESCE(SUM(te.hours), 0) as total_hours,
      COALESCE(SUM(CASE WHEN te.is_billable = 1 THEN te.hours ELSE 0 END), 0) as billable_hours,
      COALESCE(SUM(te.billed_amount), 0) as total_billed,
      t.target_hours as monthly_target
    FROM users u
    LEFT JOIN time_entries te ON u.id = te.user_id AND te.entry_date >= ?
    LEFT JOIN targets t ON u.id = t.user_id AND t.year = ? AND t.month = ?
    WHERE u.role = 'lawyer' AND u.is_active = 1
    GROUP BY u.id ORDER BY billable_hours DESC
  `).all(monthStart, year, month);

  // Monthly trend (last 12 months)
  const monthlyTrend = db.prepare(`
    SELECT strftime('%Y-%m', entry_date) as month,
      SUM(hours) as total_hours,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours,
      SUM(billed_amount) as total_billed
    FROM time_entries
    WHERE entry_date >= date('now', '-12 months')
    GROUP BY strftime('%Y-%m', entry_date)
    ORDER BY month
  `).all();

  // Active matters by billing model
  const mattersByModel = db.prepare(`
    SELECT billing_model, COUNT(*) as count,
      SUM(COALESCE((SELECT SUM(hours) FROM time_entries te WHERE te.matter_id = m.id AND te.is_billable = 1), 0)) as total_hours
    FROM matters m WHERE status = 'open'
    GROUP BY billing_model
  `).all();

  // Top clients by billing
  const topClients = db.prepare(`
    SELECT c.name as client_name, c.id,
      SUM(te.billed_amount) as total_billed,
      COUNT(DISTINCT m.id) as matter_count
    FROM clients c
    JOIN matters m ON c.id = m.client_id
    JOIN time_entries te ON m.id = te.matter_id
    WHERE strftime('%Y', te.entry_date) = ?
    GROUP BY c.id ORDER BY total_billed DESC LIMIT 8
  `).all(String(year));

  // Practice area utilization
  const practiceAreaStats = db.prepare(`
    SELECT pa.name,
      SUM(te.hours) as total_hours,
      SUM(CASE WHEN te.is_billable = 1 THEN te.hours ELSE 0 END) as billable_hours,
      SUM(te.billed_amount) as total_billed
    FROM time_entries te
    JOIN matters m ON te.matter_id = m.id
    JOIN practice_areas pa ON m.practice_area_id = pa.id
    WHERE strftime('%Y', te.entry_date) = ?
    GROUP BY pa.id ORDER BY total_billed DESC
  `).all(String(year));

  // Pending approvals
  const pendingApprovals = db.prepare(`
    SELECT COUNT(*) as count FROM time_entries WHERE status = 'submitted'
  `).get();

  // Open matters summary
  const mattersSummary = db.prepare(`
    SELECT COUNT(*) as total,
      SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open,
      SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed,
      SUM(CASE WHEN status = 'on_hold' THEN 1 ELSE 0 END) as on_hold
    FROM matters
  `).get();

  res.json({
    month_totals: monthTotals,
    prev_month_totals: prevMonthTotals,
    ytd_totals: ytdTotals,
    lawyer_performance: lawyerPerformance,
    monthly_trend: monthlyTrend,
    matters_by_model: mattersByModel,
    top_clients: topClients,
    practice_area_stats: practiceAreaStats,
    pending_approvals: pendingApprovals.count,
    matters_summary: mattersSummary,
    current_month: month,
    current_year: year,
  });
});

// Approve/reject time entries (managers)
router.post('/approve', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { ids, action } = req.body;
  if (!Array.isArray(ids) || !['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'ids array and action (approve/reject) required' });
  }
  const newStatus = action === 'approve' ? 'approved' : 'draft';
  const placeholders = ids.map(() => '?').join(',');
  db.prepare(`UPDATE time_entries SET status = ?, updated_at = datetime('now') WHERE id IN (${placeholders}) AND status = 'submitted'`).run(newStatus, ...ids);
  res.json({ success: true });
});

module.exports = router;
