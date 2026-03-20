// 代码高亮 (简易版)
const Highlight = {
    keywords: {
        javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined'],
        python: ['def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'raise', 'with', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is'],
        sql: ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'AND', 'OR', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX', 'GROUP', 'ORDER', 'BY', 'HAVING'],
        bash: ['if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'case', 'esac', 'function', 'echo', 'export', 'source', 'return', 'exit']
    },

    highlight(code, language) {
        if (!code) return '';

        // 转义 HTML
        let highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 字符串高亮
        highlighted = highlighted.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span style="color: #a78bfa;">$&</span>');

        // 注释高亮
        highlighted = highlighted.replace(/(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm, '<span style="color: #6b7280;">$&</span>');

        // 关键字高亮
        const keywords = this.keywords[language] || [];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            highlighted = highlighted.replace(regex, '<span style="color: #f472b6; font-weight: bold;">$1</span>');
        });

        // 数字高亮
        highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #fbbf24;">$1</span>');

        return highlighted;
    }
};

// 代码片段管理
const SnippetsApp = {
    snippets: [],

    init() {
        this.snippets = App.storage.get('snippets') || [];
        this.render();
        this.bindEvents();
    },

    bindEvents() {
        const addBtn = document.getElementById('addSnippetBtn');
        const searchInput = document.getElementById('searchInput');

        if (addBtn) {
            addBtn.addEventListener('click', () => this.addSnippet());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.render(searchInput.value));
        }
    },

    addSnippet() {
        const title = document.getElementById('snippetTitle');
        const language = document.getElementById('languageSelect');
        const tags = document.getElementById('snippetTags');
        const code = document.getElementById('snippetCode');

        if (!code || !code.value.trim()) return;

        const snippet = {
            id: Date.now(),
            title: title ? title.value.trim() || '未命名片段' : '未命名片段',
            language: language ? language.value : 'javascript',
            tags: tags ? tags.value.split(',').map(t => t.trim()).filter(t => t) : [],
            code: code.value,
            createdAt: new Date().toISOString()
        };

        this.snippets.unshift(snippet);
        this.save();
        this.render();

        // 清空输入
        if (title) title.value = '';
        if (tags) tags.value = '';
        if (code) code.value = '';
    },

    deleteSnippet(id) {
        this.snippets = this.snippets.filter(s => s.id !== id);
        this.save();
        this.render();
    },

    copyCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            alert('代码已复制到剪贴板！');
        });
    },

    render(search = '') {
        const list = document.getElementById('snippetsList');
        if (!list) return;

        let filtered = this.snippets;
        if (search) {
            const s = search.toLowerCase();
            filtered = this.snippets.filter(sn => 
                sn.title.toLowerCase().includes(s) ||
                sn.tags.some(t => t.toLowerCase().includes(s)) ||
                sn.code.toLowerCase().includes(s)
            );
        }

        list.innerHTML = filtered.map(sn => `
            <div class="snippet-card" data-id="${sn.id}">
                <div class="snippet-header">
                    <h3>${this.escapeHtml(sn.title)}</h3>
                    <span class="snippet-language">${sn.language}</span>
                </div>
                <div class="snippet-tags">
                    ${sn.tags.map(t => `<span class="tag">${this.escapeHtml(t)}</span>`).join('')}
                </div>
                <pre class="snippet-code"><code>${Highlight.highlight(sn.code, sn.language)}</code></pre>
                <div class="snippet-actions">
                    <button class="btn-copy" onclick="SnippetsApp.copyCode(\`${this.escapeForJs(sn.code)}\`)">📋 复制</button>
                    <button class="btn-delete" onclick="SnippetsApp.deleteSnippet(${sn.id})">🗑️ 删除</button>
                </div>
            </div>
        `).join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    escapeForJs(text) {
        return text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    },

    save() {
        App.storage.set('snippets', this.snippets);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SnippetsApp.init();
});
