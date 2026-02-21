const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// ---- Practice Areas ----
router.get('/practice-areas', requireAuth, (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM practice_areas ORDER BY name').all());
});

router.post('/practice-areas', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { name, description, default_rate } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const id = uuidv4();
  db.prepare('INSERT INTO practice_areas (id, name, description, default_rate) VALUES (?, ?, ?, ?)').run(id, name, description || null, default_rate || 0);
  res.status(201).json(db.prepare('SELECT * FROM practice_areas WHERE id = ?').get(id));
});

router.put('/practice-areas/:id', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { name, description, default_rate, is_active } = req.body;
  const pa = db.prepare('SELECT id FROM practice_areas WHERE id = ?').get(req.params.id);
  if (!pa) return res.status(404).json({ error: 'Practice area not found' });

  const updates = []; const params = [];
  if (name !== undefined) { updates.push('name = ?'); params.push(name); }
  if (description !== undefined) { updates.push('description = ?'); params.push(description); }
  if (default_rate !== undefined) { updates.push('default_rate = ?'); params.push(default_rate); }
  if (is_active !== undefined) { updates.push('is_active = ?'); params.push(is_active); }
  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
  params.push(req.params.id);
  db.prepare(`UPDATE practice_areas SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  res.json(db.prepare('SELECT * FROM practice_areas WHERE id = ?').get(req.params.id));
});

// ---- Billing Rates ----
router.get('/rates', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const rates = db.prepare(`
    SELECT br.*,
      u.full_name as user_name, u.email as user_email,
      m.name as matter_name, m.matter_number,
      pa.name as practice_area_name
    FROM billing_rates br
    LEFT JOIN users u ON br.user_id = u.id
    LEFT JOIN matters m ON br.matter_id = m.id
    LEFT JOIN practice_areas pa ON br.practice_area_id = pa.id
    ORDER BY br.created_at DESC
  `).all();
  res.json(rates);
});

router.post('/rates', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { user_id, matter_id, practice_area_id, rate_type, rate, effective_from, effective_to, notes } = req.body;
  if (!rate) return res.status(400).json({ error: 'rate is required' });

  const id = uuidv4();
  db.prepare(`
    INSERT INTO billing_rates (id, user_id, matter_id, practice_area_id, rate_type, rate, effective_from, effective_to, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, user_id || null, matter_id || null, practice_area_id || null, rate_type || 'hourly', rate, effective_from || new Date().toISOString().split('T')[0], effective_to || null, notes || null);

  res.status(201).json(db.prepare('SELECT * FROM billing_rates WHERE id = ?').get(id));
});

router.delete('/rates/:id', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM billing_rates WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ---- Firm Settings ----
router.get('/settings', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM firm_settings ORDER BY key').all();
  const settings = {};
  for (const row of rows) settings[row.key] = row;
  res.json(settings);
});

router.put('/settings', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const updates = req.body; // { key: value, ... }
  if (!updates || typeof updates !== 'object') return res.status(400).json({ error: 'Invalid settings data' });

  const upsert = db.prepare(`
    INSERT INTO firm_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);
  for (const [key, value] of Object.entries(updates)) {
    upsert.run(key, String(value));
  }
  res.json({ success: true });
});

// ---- Users (lawyer management) ----
router.get('/users', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const users = db.prepare(`
    SELECT u.*,
      pa.name as practice_area_name,
      COALESCE((SELECT SUM(hours) FROM time_entries te WHERE te.user_id = u.id AND strftime('%Y', te.entry_date) = strftime('%Y', 'now') AND te.is_billable = 1), 0) as ytd_billable_hours,
      COALESCE((SELECT SUM(billed_amount) FROM time_entries te WHERE te.user_id = u.id AND strftime('%Y', te.entry_date) = strftime('%Y', 'now')), 0) as ytd_billed_amount
    FROM users u
    LEFT JOIN practice_areas pa ON u.practice_area_id = pa.id
    ORDER BY u.full_name
  `).all();
  res.json(users.map(u => { delete u.password_hash; return u; }));
});

router.put('/users/:id', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const allowedFields = ['full_name', 'title', 'bar_number', 'practice_area_id', 'default_hourly_rate', 'is_active'];
  const updates = []; const params = [];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) { updates.push(`${field} = ?`); params.push(req.body[field]); }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
  updates.push("updated_at = datetime('now')");
  params.push(req.params.id);
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  delete updated.password_hash;
  res.json(updated);
});

// ---- Targets ----
router.get('/targets', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { year, user_id } = req.query;
  let query = `
    SELECT t.*, u.full_name as user_name, u.email as user_email
    FROM targets t JOIN users u ON t.user_id = u.id WHERE 1=1
  `;
  const params = [];
  if (year) { query += ' AND t.year = ?'; params.push(Number(year)); }
  if (user_id) { query += ' AND t.user_id = ?'; params.push(user_id); }
  query += ' ORDER BY u.full_name, t.year, t.month';
  res.json(db.prepare(query).all(...params));
});

router.put('/targets', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { user_id, year, month, target_hours, target_amount } = req.body;
  if (!user_id || !year || !target_hours) return res.status(400).json({ error: 'user_id, year, target_hours required' });

  const existing = db.prepare('SELECT id FROM targets WHERE user_id = ? AND year = ? AND month IS ?').get(user_id, year, month || null);
  if (existing) {
    db.prepare('UPDATE targets SET target_hours = ?, target_amount = ? WHERE id = ?').run(target_hours, target_amount || 0, existing.id);
  } else {
    db.prepare('INSERT INTO targets (id, user_id, year, month, target_hours, target_amount) VALUES (?, ?, ?, ?, ?, ?)').run(uuidv4(), user_id, year, month || null, target_hours, target_amount || 0);
  }
  res.json({ success: true });
});

module.exports = router;
