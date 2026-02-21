const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
const SQLiteStore = require('connect-sqlite3')(session);
app.use(session({
  store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, 'db') }),
  secret: process.env.SESSION_SECRET || 'lawfirm-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    httpOnly: true,
  }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/time-entries', require('./routes/timeEntries'));
app.use('/api/matters', require('./routes/matters'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/billing', require('./routes/billing'));
app.use('/api/dashboard', require('./routes/dashboard'));

// SPA fallback for HTML pages
app.get('*', (req, res) => {
  if (!req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  console.log(`Law Firm Time Tracker running on http://localhost:${PORT}`);
  console.log(`Run 'npm run seed' to populate with demo data`);
});
