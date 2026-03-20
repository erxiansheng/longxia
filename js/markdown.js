// Markdown 编辑器功能
const MarkdownEditor = {
    input: null,
    preview: null,

    init() {
        this.input = document.getElementById('markdownInput');
        this.preview = document.getElementById('preview');

        if (!this.input || !this.preview) return;

        // 加载保存的内容
        const saved = App.storage.get('markdown-content');
        if (saved) {
            this.input.value = saved;
            this.render();
        }

        // 实时预览
        this.input.addEventListener('input', () => {
            this.render();
            this.save();
        });

        // 导出按钮
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.export());
        }
    },

    // 简易 Markdown 渲染
    render() {
        let text = this.input.value;

        // 转义 HTML
        text = text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // 标题
        text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');

        // 粗体和斜体
        text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 代码块
        text = text.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');

        // 链接
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // 引用
        text = text.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

        // 列表
        text = text.replace(/^\* (.*$)/gm, '<li>$1</li>');
        text = text.replace(/^- (.*$)/gm, '<li>$1</li>');
        text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // 分隔线
        text = text.replace(/^---$/gm, '<hr>');

        // 段落
        text = text.replace(/\n\n/g, '</p><p>');
        text = '<p>' + text + '</p>';

        this.preview.innerHTML = text;
    },

    save() {
        App.storage.set('markdown-content', this.input.value);
    },

    export() {
        const blob = new Blob([this.input.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    MarkdownEditor.init();
});
