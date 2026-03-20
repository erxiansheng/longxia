// 智能创意工作室 - 公共JS模块

// 主题管理
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('studio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateButton(saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('studio_theme', next);
    this.updateButton(next);
  },

  updateButton(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }
};

// Toast 通知
const Toast = {
  show(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : '!'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  warning(message) { this.show(message, 'warning'); }
};

// 最近使用记录
const RecentManager = {
  add(type, title = '', id = null) {
    const recent = JSON.parse(localStorage.getItem('studio_recent') || '[]');
    const entry = {
      type,
      title,
      id,
      time: Date.now()
    };

    // 去重：如果已存在相同类型和id的记录，先删除
    const filtered = recent.filter(r => !(r.type === type && r.id === id));
    filtered.unshift(entry);

    // 最多保留20条
    localStorage.setItem('studio_recent', JSON.stringify(filtered.slice(0, 20)));
  },

  clear() {
    localStorage.removeItem('studio_recent');
  }
};

// UUID生成
function generateId() {
  return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

// 防抖函数
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 初始化主题
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => ThemeManager.toggle());
  }
});

// 导出全局函数
window.Toast = Toast;
window.RecentManager = RecentManager;
window.generateId = generateId;
window.debounce = debounce;
