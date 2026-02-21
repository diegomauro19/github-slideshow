const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('./database');

async function seed() {
  const db = getDb();
  console.log('Seeding database...');

  // Practice areas
  const practiceAreas = [
    { id: uuidv4(), name: 'Corporate Law', description: 'Business formations, mergers, contracts', default_rate: 450 },
    { id: uuidv4(), name: 'Litigation', description: 'Civil and commercial litigation', default_rate: 400 },
    { id: uuidv4(), name: 'Real Estate', description: 'Property transactions and disputes', default_rate: 350 },
    { id: uuidv4(), name: 'Intellectual Property', description: 'Patents, trademarks, copyrights', default_rate: 500 },
    { id: uuidv4(), name: 'Employment Law', description: 'Labor and employment matters', default_rate: 375 },
    { id: uuidv4(), name: 'Tax Law', description: 'Corporate and individual tax matters', default_rate: 425 },
  ];

  const insertPA = db.prepare(`INSERT OR IGNORE INTO practice_areas (id, name, description, default_rate) VALUES (?, ?, ?, ?)`);
  for (const pa of practiceAreas) {
    insertPA.run(pa.id, pa.name, pa.description, pa.default_rate);
  }
  console.log('Practice areas seeded.');

  // Get actual practice area IDs from DB
  const paRows = db.prepare('SELECT id, name FROM practice_areas').all();
  const paMap = {};
  for (const row of paRows) paMap[row.name] = row.id;

  // Firm settings
  const settings = [
    { key: 'firm_name', value: 'Sterling & Associates Law Firm', description: 'Name of the law firm' },
    { key: 'default_tax_rate', value: '0', description: 'Default tax rate on invoices (%)' },
    { key: 'invoice_prefix', value: 'INV', description: 'Prefix for invoice numbers' },
    { key: 'payment_terms_days', value: '30', description: 'Default payment terms (days)' },
    { key: 'fiscal_year_start', value: '01', description: 'Fiscal year start month (01-12)' },
    { key: 'currency', value: 'USD', description: 'Default currency' },
    { key: 'currency_symbol', value: '$', description: 'Currency symbol' },
    { key: 'annual_billable_target', value: '1800', description: 'Default annual billable hours target' },
    { key: 'overtime_threshold', value: '8', description: 'Daily hours threshold before overtime alert' },
  ];

  const insertSetting = db.prepare(`INSERT OR IGNORE INTO firm_settings (key, value, description) VALUES (?, ?, ?)`);
  for (const s of settings) {
    insertSetting.run(s.key, s.value, s.description);
  }
  console.log('Firm settings seeded.');

  // Users
  const adminHash = await bcrypt.hash('admin123', 10);
  const managerHash = await bcrypt.hash('manager123', 10);
  const lawyerHash = await bcrypt.hash('lawyer123', 10);

  const users = [
    { id: uuidv4(), email: 'admin@sterling.law', password_hash: adminHash, full_name: 'Admin User', role: 'admin', title: 'System Administrator', practice_area_id: null, default_hourly_rate: 0 },
    { id: uuidv4(), email: 'manager@sterling.law', password_hash: managerHash, full_name: 'Margaret Sterling', role: 'manager', title: 'Managing Partner', practice_area_id: paMap['Corporate Law'], default_hourly_rate: 600 },
    { id: uuidv4(), email: 'james@sterling.law', password_hash: lawyerHash, full_name: 'James Holloway', role: 'lawyer', title: 'Senior Associate', bar_number: 'BAR-2019-001', practice_area_id: paMap['Litigation'], default_hourly_rate: 400 },
    { id: uuidv4(), email: 'sarah@sterling.law', password_hash: lawyerHash, full_name: 'Sarah Chen', role: 'lawyer', title: 'Partner', bar_number: 'BAR-2015-042', practice_area_id: paMap['Intellectual Property'], default_hourly_rate: 520 },
    { id: uuidv4(), email: 'michael@sterling.law', password_hash: lawyerHash, full_name: 'Michael Torres', role: 'lawyer', title: 'Associate', bar_number: 'BAR-2022-017', practice_area_id: paMap['Real Estate'], default_hourly_rate: 300 },
    { id: uuidv4(), email: 'emily@sterling.law', password_hash: lawyerHash, full_name: 'Emily Watson', role: 'lawyer', title: 'Senior Partner', bar_number: 'BAR-2010-008', practice_area_id: paMap['Corporate Law'], default_hourly_rate: 580 },
  ];

  const insertUser = db.prepare(`INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role, title, bar_number, practice_area_id, default_hourly_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const u of users) {
    insertUser.run(u.id, u.email, u.password_hash, u.full_name, u.role, u.title, u.bar_number || null, u.practice_area_id, u.default_hourly_rate);
  }
  console.log('Users seeded.');

  // Get user IDs
  const userRows = db.prepare('SELECT id, email, full_name FROM users').all();
  const userMap = {};
  for (const row of userRows) {
    userMap[row.email] = row.id;
  }

  // Clients
  const clients = [
    { id: uuidv4(), name: 'Apex Technologies Inc.', email: 'legal@apextech.com', phone: '555-0101', contact_person: 'Robert Kim', client_type: 'corporate', tax_id: '12-3456789' },
    { id: uuidv4(), name: 'Riverside Properties LLC', email: 'info@riverside.com', phone: '555-0202', contact_person: 'Linda Park', client_type: 'corporate', tax_id: '98-7654321' },
    { id: uuidv4(), name: 'Dr. Patricia Hayes', email: 'hayes@medical.net', phone: '555-0303', contact_person: 'Patricia Hayes', client_type: 'individual' },
    { id: uuidv4(), name: 'Global Brands Co.', email: 'legal@globalbrands.com', phone: '555-0404', contact_person: 'Alex Morrison', client_type: 'corporate', tax_id: '55-1234567' },
    { id: uuidv4(), name: 'StartUp Ventures', email: 'founders@startupv.io', phone: '555-0505', contact_person: 'Nina Patel', client_type: 'corporate', tax_id: '77-9876543' },
  ];

  const insertClient = db.prepare(`INSERT OR IGNORE INTO clients (id, name, email, phone, contact_person, client_type, tax_id) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  for (const c of clients) {
    insertClient.run(c.id, c.name, c.email, c.phone, c.contact_person, c.client_type, c.tax_id || null);
  }
  console.log('Clients seeded.');

  // Get client IDs
  const clientRows = db.prepare('SELECT id, name FROM clients').all();
  const clientMap = {};
  for (const row of clientRows) clientMap[row.name] = row.id;

  // Matters
  const matters = [
    { id: uuidv4(), client_id: clientMap['Apex Technologies Inc.'], practice_area_id: paMap['Corporate Law'], matter_number: 'MAT-2024-001', name: 'Merger with DataSoft Corp', status: 'open', billing_model: 'hourly', responsible_lawyer_id: userMap['emily@sterling.law'], open_date: '2024-01-15', budget_hours: 200 },
    { id: uuidv4(), client_id: clientMap['Apex Technologies Inc.'], practice_area_id: paMap['Intellectual Property'], matter_number: 'MAT-2024-002', name: 'Patent Portfolio Review', status: 'open', billing_model: 'fixed_fee', fixed_fee_amount: 25000, responsible_lawyer_id: userMap['sarah@sterling.law'], open_date: '2024-02-01' },
    { id: uuidv4(), client_id: clientMap['Riverside Properties LLC'], practice_area_id: paMap['Real Estate'], matter_number: 'MAT-2024-003', name: 'Commercial Lease Disputes', status: 'open', billing_model: 'hourly', responsible_lawyer_id: userMap['michael@sterling.law'], open_date: '2024-03-10', budget_hours: 80 },
    { id: uuidv4(), client_id: clientMap['Dr. Patricia Hayes'], practice_area_id: paMap['Litigation'], matter_number: 'MAT-2024-004', name: 'Medical Malpractice Defense', status: 'open', billing_model: 'contingency', contingency_percentage: 33, responsible_lawyer_id: userMap['james@sterling.law'], open_date: '2024-01-20' },
    { id: uuidv4(), client_id: clientMap['Global Brands Co.'], practice_area_id: paMap['Intellectual Property'], matter_number: 'MAT-2024-005', name: 'Trademark Infringement Case', status: 'open', billing_model: 'hourly', responsible_lawyer_id: userMap['sarah@sterling.law'], open_date: '2024-04-05', budget_hours: 120 },
    { id: uuidv4(), client_id: clientMap['StartUp Ventures'], practice_area_id: paMap['Corporate Law'], matter_number: 'MAT-2024-006', name: 'Series A Funding Round', status: 'open', billing_model: 'retainer', retainer_amount: 10000, retainer_balance: 7500, responsible_lawyer_id: userMap['emily@sterling.law'], open_date: '2024-05-01' },
  ];

  const insertMatter = db.prepare(`INSERT OR IGNORE INTO matters (id, client_id, practice_area_id, matter_number, name, status, billing_model, fixed_fee_amount, contingency_percentage, retainer_amount, retainer_balance, responsible_lawyer_id, open_date, budget_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of matters) {
    insertMatter.run(m.id, m.client_id, m.practice_area_id, m.matter_number, m.name, m.status, m.billing_model, m.fixed_fee_amount || 0, m.contingency_percentage || 0, m.retainer_amount || 0, m.retainer_balance || 0, m.responsible_lawyer_id, m.open_date, m.budget_hours || 0);
  }
  console.log('Matters seeded.');

  // Get matter IDs
  const matterRows = db.prepare('SELECT id, matter_number FROM matters').all();
  const matterMap = {};
  for (const row of matterRows) matterMap[row.matter_number] = row.id;

  // Time entries (last 60 days)
  const timeEntries = [];
  const lawyers = [
    { id: userMap['james@sterling.law'], rate: 400 },
    { id: userMap['sarah@sterling.law'], rate: 520 },
    { id: userMap['michael@sterling.law'], rate: 300 },
    { id: userMap['emily@sterling.law'], rate: 580 },
  ];
  const matterIds = Object.values(matterMap);
  const activities = ['billable', 'billable', 'billable', 'non_billable', 'billable'];
  const descriptions = [
    'Client consultation and strategy review',
    'Legal research on precedents',
    'Document drafting and review',
    'Court filing preparation',
    'Phone conference with opposing counsel',
    'Contract negotiation session',
    'Discovery document review',
    'Deposition preparation',
    'Motion drafting',
    'Status meeting with client',
    'Due diligence review',
    'Regulatory compliance analysis',
  ];

  const now = new Date();
  for (let d = 60; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // skip weekends
    const dateStr = date.toISOString().split('T')[0];

    for (const lawyer of lawyers) {
      const numEntries = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numEntries; i++) {
        const matterId = matterIds[Math.floor(Math.random() * matterIds.length)];
        const hours = Math.round((Math.random() * 3 + 0.5) * 4) / 4; // 0.5 to 3.5 in 0.25 increments
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const isBillable = activity === 'billable' ? 1 : 0;
        const billedAmount = isBillable ? hours * lawyer.rate : 0;
        const statuses = ['submitted', 'approved', 'submitted', 'approved', 'invoiced'];
        const status = d > 30 ? statuses[Math.floor(Math.random() * statuses.length)] : (d > 7 ? 'submitted' : 'draft');

        timeEntries.push({
          id: uuidv4(),
          user_id: lawyer.id,
          matter_id: matterId,
          entry_date: dateStr,
          hours,
          description: descriptions[Math.floor(Math.random() * descriptions.length)],
          activity_type: activity,
          billing_rate: lawyer.rate,
          billed_amount: billedAmount,
          status,
          is_billable: isBillable,
        });
      }
    }
  }

  const insertTE = db.prepare(`INSERT OR IGNORE INTO time_entries (id, user_id, matter_id, entry_date, hours, description, activity_type, billing_rate, billed_amount, status, is_billable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const te of timeEntries) {
    insertTE.run(te.id, te.user_id, te.matter_id, te.entry_date, te.hours, te.description, te.activity_type, te.billing_rate, te.billed_amount, te.status, te.is_billable);
  }
  console.log(`Time entries seeded (${timeEntries.length} entries).`);

  // Targets
  const year = new Date().getFullYear();
  const insertTarget = db.prepare(`INSERT OR IGNORE INTO targets (id, user_id, year, month, target_hours, target_amount) VALUES (?, ?, ?, ?, ?, ?)`);
  for (const lawyer of lawyers) {
    insertTarget.run(uuidv4(), lawyer.id, year, null, 1800, 1800 * lawyer.rate);
    for (let m = 1; m <= 12; m++) {
      insertTarget.run(uuidv4(), lawyer.id, year, m, 150, 150 * lawyer.rate);
    }
  }
  console.log('Targets seeded.');

  console.log('\n=== Seed Complete ===');
  console.log('Login credentials:');
  console.log('  Admin:   admin@sterling.law    / admin123');
  console.log('  Manager: manager@sterling.law  / manager123');
  console.log('  Lawyer:  james@sterling.law    / lawyer123');
  console.log('  Lawyer:  sarah@sterling.law    / lawyer123');
  console.log('  Lawyer:  michael@sterling.law  / lawyer123');
  console.log('  Lawyer:  emily@sterling.law    / lawyer123');
}

seed().catch(console.error).finally(() => process.exit(0));
