// 任务管理功能
const TodoApp = {
    todos: [],
    filter: 'all',

    init() {
        // 加载保存的任务
        this.todos = App.storage.get('todos') || [];

        // 渲染列表
        this.render();

        // 绑定事件
        this.bindEvents();
    },

    bindEvents() {
        // 添加任务
        const addBtn = document.getElementById('addTodoBtn');
        const input = document.getElementById('todoInput');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.addTodo());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addTodo();
            });
        }

        // 过滤按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filter = btn.dataset.filter;
                this.render();
            });
        });
    },

    addTodo() {
        const input = document.getElementById('todoInput');
        const priority = document.getElementById('prioritySelect');
        const dueDate = document.getElementById('dueDateInput');

        if (!input || !input.value.trim()) return;

        const todo = {
            id: Date.now(),
            text: input.value.trim(),
            completed: false,
            priority: priority ? priority.value : 'medium',
            dueDate: dueDate ? dueDate.value : null,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.save();
        this.render();

        input.value = '';
        if (dueDate) dueDate.value = '';
    },

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.render();
        }
    },

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    },

    render() {
        const list = document.getElementById('todoList');
        if (!list) return;

        let filtered = this.todos;
        if (this.filter === 'active') {
            filtered = this.todos.filter(t => !t.completed);
        } else if (this.filter === 'completed') {
            filtered = this.todos.filter(t => t.completed);
        }

        list.innerHTML = filtered.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-priority priority-${todo.priority}">${this.getPriorityLabel(todo.priority)}</span>
                ${todo.dueDate ? `<span class="todo-due">📅 ${todo.dueDate}</span>` : ''}
                <button class="todo-delete" title="删除">×</button>
            </li>
        `).join('');

        // 绑定项目事件
        list.querySelectorAll('.todo-item').forEach(item => {
            const id = parseInt(item.dataset.id);

            item.querySelector('.todo-checkbox').addEventListener('change', () => {
                this.toggleTodo(id);
            });

            item.querySelector('.todo-delete').addEventListener('click', () => {
                this.deleteTodo(id);
            });
        });
    },

    getPriorityLabel(priority) {
        const labels = {
            high: '高',
            medium: '中',
            low: '低'
        };
        return labels[priority] || '中';
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    save() {
        App.storage.set('todos', this.todos);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TodoApp.init();
});
