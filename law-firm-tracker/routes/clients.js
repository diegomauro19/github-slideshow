const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const db = getDb();
  const { is_active } = req.query;
  let query = `
    SELECT c.*,
      COUNT(DISTINCT m.id) as total_matters,
      COUNT(DISTINCT CASE WHEN m.status = 'open' THEN m.id END) as open_matters,
      COALESCE(SUM(te.billed_amount), 0) as total_billed
    FROM clients c
    LEFT JOIN matters m ON c.id = m.client_id
    LEFT JOIN time_entries te ON m.id = te.matter_id
    WHERE 1=1
  `;
  const params = [];
  if (is_active !== undefined) { query += ' AND c.is_active = ?'; params.push(Number(is_active)); }
  query += ' GROUP BY c.id ORDER BY c.name';
  res.json(db.prepare(query).all(...params));
});

router.get('/:id', requireAuth, (req, res) => {
  const db = getDb();
  const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });
  res.json(client);
});

router.post('/', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const { name, email, phone, address, contact_person, client_type, billing_address, tax_id, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const id = uuidv4();
  db.prepare(`
    INSERT INTO clients (id, name, email, phone, address, contact_person, client_type, billing_address, tax_id, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, email || null, phone || null, address || null, contact_person || null, client_type || 'individual', billing_address || null, tax_id || null, notes || null);

  res.status(201).json(db.prepare('SELECT * FROM clients WHERE id = ?').get(id));
});

router.put('/:id', requireRole('manager', 'admin'), (req, res) => {
  const db = getDb();
  const client = db.prepare('SELECT id FROM clients WHERE id = ?').get(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });

  const allowedFields = ['name', 'email', 'phone', 'address', 'contact_person', 'client_type', 'billing_address', 'tax_id', 'notes', 'is_active'];
  const updates = [];
  const params = [];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) { updates.push(`${field} = ?`); params.push(req.body[field]); }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
  updates.push("updated_at = datetime('now')");
  params.push(req.params.id);
  db.prepare(`UPDATE clients SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  res.json(db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id));
});

module.exports = router;
