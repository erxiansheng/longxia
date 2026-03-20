// 主题切换功能
const ThemeManager = {
    theme: 'light',

    init() {
        // 加载保存的主题
        this.theme = App.storage.get('theme') || 'light';
        this.apply();

        // 绑定切换按钮
        document.querySelectorAll('#themeToggle').forEach(btn => {
            btn.addEventListener('click', () => this.toggle());
        });
    },

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.apply();
        this.save();
    },

    apply() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // 更新按钮图标
        document.querySelectorAll('#themeToggle').forEach(btn => {
            btn.textContent = this.theme === 'light' ? '🌙' : '☀️';
        });
    },

    save() {
        App.storage.set('theme', this.theme);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
