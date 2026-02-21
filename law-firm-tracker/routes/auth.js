const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb } = require('../db/database');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  req.session.userRole = user.role;
  req.session.userName = user.full_name;

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      title: user.title,
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const db = getDb();
  const user = db.prepare('SELECT id, email, full_name, role, title, bar_number, default_hourly_rate, practice_area_id FROM users WHERE id = ?').get(req.session.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
