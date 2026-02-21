const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all matters (lawyers see their assigned, managers see all)
router.get('/', requireAuth, (req, res) => {
  const db = getDb();
  const isManager = ['manager', 'admin'].includes(req.session.userRole);
  const { client_id, status, billing_model } = req.query;

  let query = `
    SELECT m.*,
      c.name as client_name,
      pa.name as practice_area_name,
      u.full_name as responsible_lawyer_name,
      COALESCE((SELECT SUM(hours) FROM time_entries te WHERE te.matter_id = m.id AND te.is_billable = 1), 0) as total_billed_hours,
      COALESCE((SELECT SUM(billed_amount) FROM time_entries te WHERE te.matter_id = m.id), 0) as total_billed_amount
    FROM matters m
    JOIN clients c ON m.client_id = c.id
    LEFT JOIN practice_areas pa ON m.practice_area_id = pa.id
    LEFT JOIN users u ON m.responsible_lawyer_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (!isManager) {
    query += ' AND (m.responsible_lawyer_id = ? OR m.id IN (SELECT DISTINCT matter_id FROM time_entries WHERE user_id = ?))';
    params.push(req.session.userId, req.session.userId);
  }
  if (client_id) { query += ' AND m.client_id = ?'; params.push(client_id); }
  if (status) { query += ' AND m.status = ?'; params.push(status); }
  if (billing_model) { query += ' AND m.billing_model = ?'; params.push(billing_model); }

  query += ' ORDER BY m.created_at DESC';

  const matters = db.prepare(query).all(...params);
  res.json(matters);
});

// Get single matter
router.get('/:id', requireAuth, (req, res) => {
  const db = getDb();
  const matter = db.prepare(`
    SELECT m.*,
      c.name as client_name, c.email as client_email, c.contact_person,
      pa.name as practice_area_name,
      u.full_name as responsible_lawyer_name
    FROM matters m
    JOIN clients c ON m.client_id = c.id
    LEFT JOIN practice_areas pa ON m.practice_area_id = pa.id
    LEFT JOIN users u ON m.responsible_lawyer_id = u.id
    WHERE m.id = ?
  `).get(req.params.id);

  if (!matter) return res.status(404).json({ error: 'Matter not found' });
  res.json(matter);
});

// Create matter (managers only)
router.post('/', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const {
    client_id, practice_area_id, matter_number, name, description, status,
    billing_model, fixed_fee_amount, contingency_percentage, retainer_amount,
    budget_hours, budget_amount, open_date, responsible_lawyer_id
  } = req.body;

  if (!client_id || !name) {
    return res.status(400).json({ error: 'client_id and name are required' });
  }

  // Auto-generate matter number if not provided
  let matterNum = matter_number;
  if (!matterNum) {
    const year = new Date().getFullYear();
    const count = db.prepare("SELECT COUNT(*) as c FROM matters WHERE matter_number LIKE ?").get(`MAT-${year}-%`);
    matterNum = `MAT-${year}-${String(count.c + 1).padStart(3, '0')}`;
  }

  const id = uuidv4();
  db.prepare(`
    INSERT INTO matters (id, client_id, practice_area_id, matter_number, name, description, status, billing_model,
      fixed_fee_amount, contingency_percentage, retainer_amount, retainer_balance, budget_hours, budget_amount,
      open_date, responsible_lawyer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, client_id, practice_area_id || null, matterNum, name, description || null,
    status || 'open', billing_model || 'hourly',
    fixed_fee_amount || 0, contingency_percentage || 0,
    retainer_amount || 0, retainer_amount || 0,
    budget_hours || 0, budget_amount || 0,
    open_date || new Date().toISOString().split('T')[0],
    responsible_lawyer_id || null
  );

  const matter = db.prepare('SELECT * FROM matters WHERE id = ?').get(id);
  res.status(201).json(matter);
});

// Update matter
router.put('/:id', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const matter = db.prepare('SELECT id FROM matters WHERE id = ?').get(req.params.id);
  if (!matter) return res.status(404).json({ error: 'Matter not found' });

  const allowedFields = ['name', 'description', 'status', 'billing_model', 'fixed_fee_amount',
    'contingency_percentage', 'retainer_amount', 'retainer_balance', 'budget_hours', 'budget_amount',
    'open_date', 'close_date', 'responsible_lawyer_id', 'practice_area_id'];

  const updates = [];
  const params = [];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      params.push(req.body[field]);
    }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

  updates.push("updated_at = datetime('now')");
  params.push(req.params.id);
  db.prepare(`UPDATE matters SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  const updated = db.prepare(`
    SELECT m.*, c.name as client_name, pa.name as practice_area_name, u.full_name as responsible_lawyer_name
    FROM matters m JOIN clients c ON m.client_id = c.id
    LEFT JOIN practice_areas pa ON m.practice_area_id = pa.id
    LEFT JOIN users u ON m.responsible_lawyer_id = u.id
    WHERE m.id = ?
  `).get(req.params.id);
  res.json(updated);
});

module.exports = router;
