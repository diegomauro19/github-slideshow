const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'lawfirm.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  db.exec(`
    -- Users table (lawyers and managers)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('lawyer', 'manager', 'admin')),
      title TEXT,
      bar_number TEXT,
      practice_area_id TEXT,
      default_hourly_rate REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Practice areas
    CREATE TABLE IF NOT EXISTS practice_areas (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      default_rate REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Clients
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      contact_person TEXT,
      client_type TEXT DEFAULT 'individual' CHECK(client_type IN ('individual', 'corporate')),
      billing_address TEXT,
      tax_id TEXT,
      notes TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Matters (cases/projects)
    CREATE TABLE IF NOT EXISTS matters (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      practice_area_id TEXT,
      matter_number TEXT UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'open' CHECK(status IN ('open', 'closed', 'pending', 'on_hold')),
      billing_model TEXT DEFAULT 'hourly' CHECK(billing_model IN ('hourly', 'fixed_fee', 'contingency', 'retainer', 'blended')),
      fixed_fee_amount REAL DEFAULT 0,
      contingency_percentage REAL DEFAULT 0,
      retainer_amount REAL DEFAULT 0,
      retainer_balance REAL DEFAULT 0,
      budget_hours REAL DEFAULT 0,
      budget_amount REAL DEFAULT 0,
      open_date TEXT,
      close_date TEXT,
      responsible_lawyer_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (practice_area_id) REFERENCES practice_areas(id),
      FOREIGN KEY (responsible_lawyer_id) REFERENCES users(id)
    );

    -- Billing rates (override rates per lawyer per matter)
    CREATE TABLE IF NOT EXISTS billing_rates (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      matter_id TEXT,
      practice_area_id TEXT,
      rate_type TEXT DEFAULT 'hourly' CHECK(rate_type IN ('hourly', 'flat')),
      rate REAL NOT NULL,
      effective_from TEXT DEFAULT (date('now')),
      effective_to TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (matter_id) REFERENCES matters(id),
      FOREIGN KEY (practice_area_id) REFERENCES practice_areas(id)
    );

    -- Time entries
    CREATE TABLE IF NOT EXISTS time_entries (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      matter_id TEXT NOT NULL,
      entry_date TEXT NOT NULL,
      hours REAL NOT NULL,
      description TEXT NOT NULL,
      activity_type TEXT DEFAULT 'billable' CHECK(activity_type IN ('billable', 'non_billable', 'pro_bono', 'admin')),
      billing_rate REAL DEFAULT 0,
      billed_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'submitted', 'approved', 'invoiced', 'written_off')),
      invoice_id TEXT,
      is_billable INTEGER DEFAULT 1,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (matter_id) REFERENCES matters(id)
    );

    -- Invoices
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_number TEXT UNIQUE NOT NULL,
      client_id TEXT NOT NULL,
      matter_id TEXT,
      issue_date TEXT NOT NULL,
      due_date TEXT NOT NULL,
      subtotal REAL DEFAULT 0,
      tax_rate REAL DEFAULT 0,
      tax_amount REAL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      total_amount REAL DEFAULT 0,
      paid_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'sent', 'paid', 'partial', 'overdue', 'cancelled')),
      notes TEXT,
      created_by TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (matter_id) REFERENCES matters(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    -- Firm settings
    CREATE TABLE IF NOT EXISTS firm_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      description TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Targets (billable hour targets per lawyer)
    CREATE TABLE IF NOT EXISTS targets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      year INTEGER NOT NULL,
      month INTEGER,
      target_hours REAL NOT NULL,
      target_amount REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, year, month),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_time_entries_user ON time_entries(user_id);
    CREATE INDEX IF NOT EXISTS idx_time_entries_matter ON time_entries(matter_id);
    CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(entry_date);
    CREATE INDEX IF NOT EXISTS idx_matters_client ON matters(client_id);
    CREATE INDEX IF NOT EXISTS idx_matters_status ON matters(status);
  `);
}

module.exports = { getDb };
