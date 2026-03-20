# 智能创意工作室 (Intelligent Creative Studio)

一站式创意写作与知识管理工具，帮助您高效地组织想法、管理任务和记录灵感。

## 功能列表

### 📝 Markdown 编辑器
- 实时预览
- 语法高亮
- 导出功能
- 支持代码块、表格、图片等

### 🧠 思维导图
- 可视化思维整理
- 节点拖拽
- 多种布局模式
- 导出为图片

### ✅ 任务管理
- 创建、编辑、删除任务
- 任务优先级设置
- 截止日期提醒
- 任务分类管理

### 💡 代码片段
- 代码收藏与管理
- 多语言支持
- 快速搜索
- 标签分类

### 🎨 主题切换
- 明亮/暗黑模式
- 自定义主题色
- 个性化设置

## 使用说明

### 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或指定端口预览
npm run preview
```

### 部署

本项目为纯静态网站，可部署到任何静态托管服务：

- **EdgeOne Pages**: 直接推送到仓库，配置自动部署
- **Vercel**: 连接 GitHub 仓库自动部署
- **Netlify**: 拖拽上传或连接 Git 仓库
- **GitHub Pages**: 在仓库设置中启用

### 目录结构

```
studio/
├── index.html          # 主页/导航
├── markdown.html       # Markdown 编辑器
├── mindmap.html        # 思维导图
├── todo.html           # 任务管理
├── snippets.html       # 代码片段
├── css/
│   ├── style.css       # 全局样式
│   ├── markdown.css    # Markdown 样式
│   ├── mindmap.css     # 思维导图样式
│   ├── todo.css        # 任务管理样式
│   └── theme-dark.css  # 暗黑主题
├── js/
│   ├── app.js          # 主应用逻辑
│   ├── markdown.js     # Markdown 功能
│   ├── mindmap.js      # 思维导图功能
│   ├── todo.js         # 任务管理功能
│   ├── highlight.js    # 代码高亮
│   └── theme.js        # 主题切换
├── assets/
│   └── icons/          # 图标资源
└── README.md
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: CSS Variables, Flexbox, Grid
- **存储**: LocalStorage
- **部署**: 静态托管

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
