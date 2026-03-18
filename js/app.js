/**
 * 小龙虾任务平台 - UI组件库
 */

// ==================== Toast 提示框 ====================
const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  
  show(message, type = 'info', duration = 3000) {
    this.init();
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    this.container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  warning(message) { this.show(message, 'warning'); },
  info(message) { this.show(message, 'info'); }
};

// ==================== Alert 对话框 ====================
const Alert = {
  show(options = {}) {
    const {
      title = '提示',
      message = '',
      icon = '🦞',
      type = 'info',
      buttons = [{ text: '确定', primary: true }]
    } = options;
    
    // 创建遮罩
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    
    // 创建对话框
    const alert = document.createElement('div');
    alert.className = 'custom-alert active';
    alert.innerHTML = `
      <div class="alert-icon">${icon}</div>
      <h3 class="alert-title">${title}</h3>
      <p class="alert-message">${message}</p>
      <div class="alert-buttons">
        ${buttons.map((btn, i) => `
          <button class="btn ${btn.primary ? 'btn-primary' : 'btn-secondary'}" data-index="${i}">
            ${btn.text}
          </button>
        `).join('')}
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(alert);
    
    // 绑定按钮事件
    alert.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        overlay.remove();
        alert.remove();
        if (buttons[index].onClick) buttons[index].onClick();
      });
    });
    
    // 点击遮罩关闭
    overlay.addEventListener('click', () => {
      overlay.remove();
      alert.remove();
    });
  },
  
  confirm(message, onConfirm, onCancel) {
    this.show({
      title: '确认',
      message,
      icon: '❓',
      buttons: [
        { text: '取消', primary: false, onClick: onCancel },
        { text: '确定', primary: true, onClick: onConfirm }
      ]
    });
  },
  
  success(message) {
    this.show({ title: '成功', message, icon: '✅', type: 'success' });
  },
  
  error(message) {
    this.show({ title: '错误', message, icon: '❌', type: 'error' });
  }
};

// ==================== Modal 模态框 ====================
const Modal = {
  current: null,
  
  show(content, options = {}) {
    const {
      title = '',
      width = '480px',
      onClose = null
    } = options;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.maxWidth = width;
    modal.innerHTML = `
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close">×</button>
      </div>
      <div class="modal-body">${content}</div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    this.current = { overlay, modal, onClose };
    
    // 关闭按钮
    modal.querySelector('.modal-close').addEventListener('click', () => this.close());
    overlay.addEventListener('click', () => this.close());
  },
  
  close() {
    if (this.current) {
      this.current.overlay.remove();
      this.current.modal.remove();
      if (this.current.onClose) this.current.onClose();
      this.current = null;
    }
  }
};

// ==================== 自定义选择器 ====================
class CustomSelect {
  constructor(selectElement) {
    this.select = selectElement;
    this.wrapper = selectElement.parentElement;
    this.options = Array.from(selectElement.options);
    this.value = selectElement.value;
    
    this.createCustomSelect();
  }
  
  createCustomSelect() {
    // 添加样式类
    this.wrapper.classList.add('custom-select-wrapper');
    this.select.classList.add('custom-select');
  }
}

// ==================== 表单验证 ====================
const FormValidator = {
  validate(form) {
    let isValid = true;
    const errors = [];
    
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        errors.push(`${field.placeholder || field.name} 不能为空`);
      } else {
        field.classList.remove('error');
      }
    });
    
    return { isValid, errors };
  }
};

// ==================== API 封装 ====================
const API = {
  baseUrl: '/api',
  
  async request(url, options = {}) {
    try {
      const response = await fetch(this.baseUrl + url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '请求失败');
      }
      
      return data;
    } catch (error) {
      Toast.error(error.message);
      throw error;
    }
  },
  
  get(url) {
    return this.request(url);
  },
  
  post(url, data) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};

// ==================== 工具函数 ====================
function formatDate(date) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function debounce(func, wait) {
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

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
  // 初始化所有自定义选择器
  document.querySelectorAll('select').forEach(select => {
    new CustomSelect(select);
  });
  
  // 初始化Toast容器
  Toast.init();
  
  // 添加页面加载动画
  document.body.classList.add('loaded');
});

// ==================== 导出 ====================
window.Toast = Toast;
window.Alert = Alert;
window.Modal = Modal;
window.API = API;
