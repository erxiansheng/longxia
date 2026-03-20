// 主应用逻辑
const App = {
    // 本地存储封装
    storage: {
        get(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    },

    // 初始化
    init() {
        console.log('智能创意工作室已启动');
    }
};

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
