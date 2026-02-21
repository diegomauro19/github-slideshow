const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Get time entries (lawyers see own, managers see all)
router.get('/', requireAuth, (req, res) => {
  const db = getDb();
  const { start_date, end_date, matter_id, user_id, status } = req.query;
  const isManager = ['manager', 'admin'].includes(req.session.userRole);

  let query = `
    SELECT te.*,
      u.full_name as user_name, u.title as user_title,
      m.name as matter_name, m.matter_number, m.billing_model,
      c.name as client_name
    FROM time_entries te
    JOIN users u ON te.user_id = u.id
    JOIN matters m ON te.matter_id = m.id
    JOIN clients c ON m.client_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (!isManager) {
    query += ' AND te.user_id = ?';
    params.push(req.session.userId);
  } else if (user_id) {
    query += ' AND te.user_id = ?';
    params.push(user_id);
  }

  if (matter_id) { query += ' AND te.matter_id = ?'; params.push(matter_id); }
  if (status) { query += ' AND te.status = ?'; params.push(status); }
  if (start_date) { query += ' AND te.entry_date >= ?'; params.push(start_date); }
  if (end_date) { query += ' AND te.entry_date <= ?'; params.push(end_date); }

  query += ' ORDER BY te.entry_date DESC, te.created_at DESC';

  const entries = db.prepare(query).all(...params);
  res.json(entries);
});

// Create time entry
router.post('/', requireAuth, (req, res) => {
  const db = getDb();
  const { matter_id, entry_date, hours, description, activity_type, notes } = req.body;

  if (!matter_id || !entry_date || !hours || !description) {
    return res.status(400).json({ error: 'matter_id, entry_date, hours, and description are required' });
  }
  if (hours <= 0 || hours > 24) {
    return res.status(400).json({ error: 'Hours must be between 0 and 24' });
  }

  // Get billing rate for this user/matter
  const matter = db.prepare('SELECT * FROM matters WHERE id = ?').get(matter_id);
  if (!matter) return res.status(404).json({ error: 'Matter not found' });

  // Check for override rate: user+matter > user+practice_area > user default > practice area default
  const rateOverride = db.prepare(`
    SELECT rate FROM billing_rates
    WHERE user_id = ? AND matter_id = ? AND (effective_to IS NULL OR effective_to >= date('now'))
    ORDER BY effective_from DESC LIMIT 1
  `).get(req.session.userId, matter_id);

  let billingRate;
  if (rateOverride) {
    billingRate = rateOverride.rate;
  } else {
    const user = db.prepare('SELECT default_hourly_rate FROM users WHERE id = ?').get(req.session.userId);
    billingRate = user.default_hourly_rate || 0;
  }

  const actType = activity_type || 'billable';
  const isBillable = ['billable', 'pro_bono'].includes(actType) ? 1 : 0;
  const billedAmount = isBillable && actType === 'billable' ? hours * billingRate : 0;

  const id = uuidv4();
  db.prepare(`
    INSERT INTO time_entries (id, user_id, matter_id, entry_date, hours, description, activity_type, billing_rate, billed_amount, status, is_billable, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)
  `).run(id, req.session.userId, matter_id, entry_date, hours, description, actType, billingRate, billedAmount, isBillable, notes || null);

  const entry = db.prepare(`
    SELECT te.*, u.full_name as user_name, m.name as matter_name, m.matter_number, c.name as client_name
    FROM time_entries te
    JOIN users u ON te.user_id = u.id
    JOIN matters m ON te.matter_id = m.id
    JOIN clients c ON m.client_id = c.id
    WHERE te.id = ?
  `).get(id);

  res.status(201).json(entry);
});

// Update time entry
router.put('/:id', requireAuth, (req, res) => {
  const db = getDb();
  const entry = db.prepare('SELECT * FROM time_entries WHERE id = ?').get(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  const isManager = ['manager', 'admin'].includes(req.session.userRole);
  if (!isManager && entry.user_id !== req.session.userId) {
    return res.status(403).json({ error: 'Cannot edit another user\'s time entry' });
  }
  if (!isManager && entry.status !== 'draft') {
    return res.status(400).json({ error: 'Can only edit draft entries' });
  }

  const { hours, description, activity_type, entry_date, matter_id, status, notes } = req.body;

  const updates = [];
  const params = [];

  if (hours !== undefined) {
    if (hours <= 0 || hours > 24) return res.status(400).json({ error: 'Invalid hours' });
    updates.push('hours = ?'); params.push(hours);
    // Recalculate billed amount
    const rate = entry.billing_rate || 0;
    const actType = activity_type || entry.activity_type;
    const billed = actType === 'billable' ? hours * rate : 0;
    updates.push('billed_amount = ?'); params.push(billed);
  }
  if (description !== undefined) { updates.push('description = ?'); params.push(description); }
  if (activity_type !== undefined) {
    updates.push('activity_type = ?'); params.push(activity_type);
    updates.push('is_billable = ?'); params.push(['billable', 'pro_bono'].includes(activity_type) ? 1 : 0);
    const h = hours || entry.hours;
    const billed = activity_type === 'billable' ? h * (entry.billing_rate || 0) : 0;
    updates.push('billed_amount = ?'); params.push(billed);
  }
  if (entry_date !== undefined) { updates.push('entry_date = ?'); params.push(entry_date); }
  if (matter_id !== undefined) { updates.push('matter_id = ?'); params.push(matter_id); }
  if (notes !== undefined) { updates.push('notes = ?'); params.push(notes); }
  if (isManager && status !== undefined) { updates.push('status = ?'); params.push(status); }

  updates.push("updated_at = datetime('now')");
  params.push(req.params.id);

  db.prepare(`UPDATE time_entries SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  const updated = db.prepare(`
    SELECT te.*, u.full_name as user_name, m.name as matter_name, m.matter_number, c.name as client_name
    FROM time_entries te JOIN users u ON te.user_id = u.id JOIN matters m ON te.matter_id = m.id JOIN clients c ON m.client_id = c.id
    WHERE te.id = ?
  `).get(req.params.id);

  res.json(updated);
});

// Submit time entry for approval
router.post('/:id/submit', requireAuth, (req, res) => {
  const db = getDb();
  const entry = db.prepare('SELECT * FROM time_entries WHERE id = ?').get(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  if (entry.user_id !== req.session.userId && !['manager', 'admin'].includes(req.session.userRole)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (entry.status !== 'draft') return res.status(400).json({ error: 'Entry must be in draft status' });

  db.prepare("UPDATE time_entries SET status = 'submitted', updated_at = datetime('now') WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// Bulk submit
router.post('/bulk-submit', requireAuth, (req, res) => {
  const db = getDb();
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'ids array required' });

  const placeholders = ids.map(() => '?').join(',');
  const userId = req.session.userId;
  const isManager = ['manager', 'admin'].includes(req.session.userRole);

  let query = `UPDATE time_entries SET status = 'submitted', updated_at = datetime('now') WHERE id IN (${placeholders}) AND status = 'draft'`;
  const params = [...ids];
  if (!isManager) { query += ' AND user_id = ?'; params.push(userId); }

  const result = db.prepare(query).run(...params);
  res.json({ success: true, updated: result.changes });
});

// Delete time entry
router.delete('/:id', requireAuth, (req, res) => {
  const db = getDb();
  const entry = db.prepare('SELECT * FROM time_entries WHERE id = ?').get(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  const isManager = ['manager', 'admin'].includes(req.session.userRole);
  if (!isManager && entry.user_id !== req.session.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (entry.status === 'invoiced') {
    return res.status(400).json({ error: 'Cannot delete an invoiced time entry' });
  }

  db.prepare('DELETE FROM time_entries WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Summary stats
router.get('/stats/summary', requireAuth, (req, res) => {
  const db = getDb();
  const { user_id, start_date, end_date } = req.query;
  const isManager = ['manager', 'admin'].includes(req.session.userRole);
  const targetUserId = isManager && user_id ? user_id : req.session.userId;

  const params = [];
  let whereClause = 'WHERE 1=1';

  if (!isManager || user_id) {
    whereClause += ' AND te.user_id = ?';
    params.push(targetUserId);
  }
  if (start_date) { whereClause += ' AND te.entry_date >= ?'; params.push(start_date); }
  if (end_date) { whereClause += ' AND te.entry_date <= ?'; params.push(end_date); }

  const stats = db.prepare(`
    SELECT
      COUNT(*) as total_entries,
      SUM(hours) as total_hours,
      SUM(CASE WHEN is_billable = 1 THEN hours ELSE 0 END) as billable_hours,
      SUM(CASE WHEN activity_type = 'non_billable' THEN hours ELSE 0 END) as non_billable_hours,
      SUM(billed_amount) as total_billed,
      SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_count,
      SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as submitted_count,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count
    FROM time_entries te
    ${whereClause}
  `).get(...params);

  res.json(stats);
});

module.exports = router;
