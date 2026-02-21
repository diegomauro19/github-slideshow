// ===== API Helper =====
const api = {
  async request(method, url, data) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    };
    if (data) opts.body = JSON.stringify(data);
    const res = await fetch(url, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
  },
  get: (url, params) => {
    const u = params ? `${url}?${new URLSearchParams(params)}` : url;
    return api.request('GET', u);
  },
  post: (url, data) => api.request('POST', url, data),
  put: (url, data) => api.request('PUT', url, data),
  delete: (url) => api.request('DELETE', url),
};

// ===== Auth =====
let currentUser = null;

async function loadCurrentUser() {
  try {
    currentUser = await api.get('/api/auth/me');
    return currentUser;
  } catch {
    window.location.href = '/';
    return null;
  }
}

function logout() {
  api.post('/api/logout').catch(() => {});
  // Try auth route
  fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
  sessionStorage.clear();
  window.location.href = '/';
}

// ===== Toast =====
function showToast(message, type = 'success', title = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const titles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <div>
      <div class="toast-title">${title || titles[type]}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'none'; toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 350); }, 3500);
}

// ===== Modal =====
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('open');
    const form = overlay.querySelector('form');
    if (form) form.reset();
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ===== Format helpers =====
const fmt = {
  currency(val, symbol = '$') {
    const n = Number(val) || 0;
    return `${symbol}${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  },
  hours(val) {
    const h = Number(val) || 0;
    return h.toFixed(1) + 'h';
  },
  hoursDetailed(val) {
    const h = Number(val) || 0;
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  },
  date(val) {
    if (!val) return '—';
    return new Date(val + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
  shortDate(val) {
    if (!val) return '—';
    return new Date(val + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  },
  pct(val) { return (Number(val) || 0).toFixed(0) + '%'; },
  initials(name) {
    return (name || '').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },
  billingModel(val) {
    const map = { hourly: 'Hourly', fixed_fee: 'Fixed Fee', contingency: 'Contingency', retainer: 'Retainer', blended: 'Blended' };
    return map[val] || val;
  },
  activityType(val) {
    const map = { billable: 'Billable', non_billable: 'Non-Billable', pro_bono: 'Pro Bono', admin: 'Admin' };
    return map[val] || val;
  },
  status(val) {
    const map = { draft: 'Draft', submitted: 'Submitted', approved: 'Approved', invoiced: 'Invoiced', written_off: 'Written Off', open: 'Open', closed: 'Closed', on_hold: 'On Hold', pending: 'Pending' };
    return map[val] || val;
  },
};

// ===== Sidebar active link =====
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href && path.endsWith(href));
  });
}

// ===== Init sidebar user =====
function initSidebarUser(user) {
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  const avatarEl = document.getElementById('sidebar-user-avatar');
  const firmEl = document.getElementById('sidebar-firm-name');

  if (nameEl) nameEl.textContent = user.full_name;
  if (roleEl) roleEl.textContent = user.role;
  if (avatarEl) avatarEl.textContent = fmt.initials(user.full_name);
}

// ===== Tabs =====
function initTabs(containerSelector = '.tabs') {
  document.querySelectorAll(containerSelector).forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');
        panels.forEach(p => p.classList.toggle('active', p.id === target));
      });
    });
  });
}

// ===== Today's date for date inputs =====
function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ===== Timer =====
class BillableTimer {
  constructor(onTick) {
    this.seconds = 0;
    this.running = false;
    this._interval = null;
    this.onTick = onTick || (() => {});
  }
  start() {
    if (this.running) return;
    this.running = true;
    this._interval = setInterval(() => { this.seconds++; this.onTick(this.seconds); }, 1000);
  }
  stop() {
    this.running = false;
    clearInterval(this._interval);
  }
  reset() { this.stop(); this.seconds = 0; this.onTick(0); }
  toHours() { return Math.round((this.seconds / 3600) * 4) / 4; } // round to 0.25h
  format() {
    const h = Math.floor(this.seconds / 3600);
    const m = Math.floor((this.seconds % 3600) / 60);
    const s = this.seconds % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
}

// ===== Chart color palette =====
const CHART_COLORS = ['#1a2744','#c9a84c','#12b76a','#2563eb','#f79009','#e83e8c','#6f42c1','#20c997'];
