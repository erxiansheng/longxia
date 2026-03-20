# 智能创意工作室设计文档

> 域名: https://studio.dasb.cn  
> 版本: v1.0  
> 更新日期: 2026-03-20

---

## 1. 项目概述

### 1.1 产品定位

智能创意工作室是一个多功能的在线创意工具平台，为创作者、开发者和知识工作者提供一站式的创作环境。平台整合了文档编辑、思维整理、任务管理、代码收藏和AI辅助等核心能力。

### 1.2 核心价值

- **一体化体验**：无需切换多个工具，一个平台满足多种创作需求
- **数据互通**：各模块数据可关联引用，形成知识网络
- **AI增强**：智能辅助提升创作效率
- **云端同步**：跨设备无缝衔接

### 1.3 目标用户

| 用户群体 | 核心需求 |
|---------|---------|
| 内容创作者 | 写作、素材整理、灵感记录 |
| 开发者 | 代码片段管理、技术文档、任务追踪 |
| 项目经理 | 待办管理、思维导图、会议记录 |
| 学生/研究者 | 笔记整理、知识图谱、学习计划 |

---

## 2. 功能模块设计

### 2.1 Markdown编辑器

#### 2.1.1 功能特性

| 功能 | 描述 | 优先级 |
|-----|------|-------|
| 实时预览 | 左右分栏，编辑即时渲染 | P0 |
| 语法高亮 | 代码块支持多语言高亮 | P0 |
| 快捷键支持 | Markdown语法快捷键 | P0 |
| 图片上传 | 拖拽/粘贴上传，支持图床配置 | P1 |
| 目录生成 | 自动生成文档目录 | P1 |
| 导出功能 | 导出PDF/HTML/Markdown | P1 |
| 版本历史 | 文档历史版本管理 | P2 |
| 协作编辑 | 多人实时协作 | P2 |

#### 2.1.2 UI设计

```
┌─────────────────────────────────────────────────────────────────┐
│  📝 文档标题                                    [保存] [分享] [···] │
├──────────────────────┬──────────────────────────────────────────┤
│                      │                                          │
│    编辑区            │           预览区                          │
│    (Monaco Editor)   │        (渲染后的HTML)                     │
│                      │                                          │
│  ```javascript       │    语法高亮代码块                         │
│  const hello = ...   │                                          │
│  ```                 │                                          │
│                      │                                          │
├──────────────────────┴──────────────────────────────────────────┤
│  工具栏: [B] [I] [链接] [图片] [代码] [表格] [目录]    字数: 1,234 │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.1.3 交互规范

- **自动保存**：编辑停止3秒后自动保存，显示"已保存"状态
- **分栏比例**：默认1:1，可拖拽调整，记住用户偏好
- **全屏模式**：支持专注模式，隐藏侧边栏和预览
- **快捷键**：
  - `Ctrl/Cmd + S`：手动保存
  - `Ctrl/Cmd + B`：加粗
  - `Ctrl/Cmd + I`：斜体
  - `Ctrl/Cmd + K`：插入链接
  - `Ctrl/Cmd + Shift + C`：代码块

---

### 2.2 思维导图

#### 2.2.1 功能特性

| 功能 | 描述 | 优先级 |
|-----|------|-------|
| 节点操作 | 添加/删除/编辑/移动节点 | P0 |
| 主题样式 | 多种预设主题和布局 | P0 |
| 快捷键 | Tab添加子节点，Enter添加同级节点 | P0 |
| 导出图片 | 导出PNG/SVG | P1 |
| 折叠展开 | 节点折叠/展开 | P1 |
| 节点样式 | 字体/颜色/图标自定义 | P1 |
| 关联线 | 节点间关联关系 | P2 |
| 协作 | 多人实时协作 | P2 |

#### 2.2.2 UI设计

```
┌─────────────────────────────────────────────────────────────────┐
│  🧠 项目规划                              [导出] [主题] [布局] [···] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                         ┌─────────┐                            │
│                         │ 核心主题 │                            │
│                         └────┬────┘                            │
│              ┌───────────────┼───────────────┐                 │
│              │               │               │                 │
│        ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐          │
│        │  子主题1   │   │  子主题2   │   │  子主题3   │          │
│        └─────┬─────┘   └─────┬─────┘   └───────────┘          │
│              │               │                                  │
│        ┌─────┴─────┐         │                                  │
│        │  细节A     │    ┌────┴────┐                           │
│        └───────────┘    │  细节B   │                           │
│                         └─────────┘                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  工具栏: [添加节点] [删除] [样式] [图标] [放大] [缩小] [适应屏幕]   │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.2.3 交互规范

- **双击编辑**：双击节点进入编辑模式
- **拖拽移动**：拖拽节点调整位置和层级
- **右键菜单**：显示节点操作菜单
- **滚轮缩放**：滚轮缩放画布
- **快捷键**：
  - `Tab`：添加子节点
  - `Enter`：添加同级节点
  - `Delete/Backspace`：删除节点
  - `Space`：居中显示选中节点

---

### 2.3 待办清单

#### 2.3.1 功能特性

| 功能 | 描述 | 优先级 |
|-----|------|-------|
| 任务CRUD | 创建/查看/编辑/删除任务 | P0 |
| 状态管理 | 待办/进行中/已完成 | P0 |
| 优先级 | 高/中/低优先级标记 | P0 |
| 番茄钟 | 25分钟专注+5分钟休息 | P0 |
| 截止日期 | 设置任务截止时间 | P1 |
| 分类标签 | 自定义标签分类 | P1 |
| 子任务 | 任务拆解为子任务 | P1 |
| 统计报表 | 完成率/专注时长统计 | P2 |

#### 2.3.2 UI设计

```
┌─────────────────────────────────────────────────────────────────┐
│  ✅ 今日任务                                    [番茄钟] [统计] [+] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🍅 番茄钟计时器                                          │   │
│  │ ┌─────────────────────────────────────────────────────┐ │   │
│  │ │                                                     │ │   │
│  │ │                    24:32                            │ │   │
│  │ │               [开始] [暂停] [重置]                    │ │   │
│  │ │                                                     │ │   │
│  │ │            当前任务: 编写设计文档                     │ │   │
│  │ └─────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ── 高优先级 ──────────────────────────────────────────────     │
│  ⬜ 🔴 完成设计文档编写                [编辑] [删除]    今天     │
│  ⬜ 🔴 代码评审                          [编辑] [删除]    明天     │
│                                                                 │
│  ── 中优先级 ──────────────────────────────────────────────     │
│  ✅ 🟡 整理会议纪要                      [编辑] [删除]    已完成   │
│  ⬜ 🟡 更新项目文档                      [编辑] [删除]    周五     │
│                                                                 │
│  ── 低优先级 ──────────────────────────────────────────────     │
│  ⬜ 🟢 学习新技术                        [编辑] [删除]    本周     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  筛选: [全部] [进行中] [已完成]        标签: [工作] [学习] [生活]   │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.3.3 番茄钟设计

```
番茄钟周期配置:
┌────────────────────────────────────────────────┐
│  专注时间: 25分钟  [调整: 15/25/45/60分钟]      │
│  短休息:   5分钟   [调整: 3/5/10分钟]           │
│  长休息:   15分钟  [每4个番茄后]                │
│  自动开始: [开启] 下一个番茄自动开始            │
│  声音提醒: [开启] 专注结束播放提示音            │
└────────────────────────────────────────────────┘
```

#### 2.3.4 交互规范

- **快速添加**：输入框直接添加，回车确认
- **拖拽排序**：拖拽调整任务顺序
- **滑动手势**：左滑删除，右滑完成（移动端）
- **快捷键**：
  - `N`：新建任务
  - `Enter`：编辑选中任务
  - `Space`：开始番茄钟
  - `D`：删除任务

---

### 2.4 代码片段库

#### 2.4.1 功能特性

| 功能 | 描述 | 优先级 |
|-----|------|-------|
| 片段管理 | 添加/编辑/删除代码片段 | P0 |
| 语法高亮 | 支持50+编程语言 | P0 |
| 标签分类 | 多标签分类管理 | P0 |
| 搜索过滤 | 关键词/标签/语言搜索 | P0 |
| 一键复制 | 复制代码到剪贴板 | P1 |
| 收藏功能 | 常用片段收藏 | P1 |
| 分享功能 | 生成分享链接 | P2 |
| 版本管理 | 片段历史版本 | P2 |

#### 2.4.2 UI设计

```
┌─────────────────────────────────────────────────────────────────┐
│  💻 代码片段库                                  [新建] [导入] [···] │
├───────────────┬─────────────────────────────────────────────────┤
│               │                                                 │
│  🔍 搜索...   │   📄 JavaScript - 数组去重                       │
│               │   ─────────────────────────────────────────────  │
│  ── 语言 ───  │                                                 │
│  JavaScript   │   // 数组去重的几种方法                          │
│  Python       │   const unique1 = arr => [...new Set(arr)];     │
│  TypeScript   │   const unique2 = arr =>                        │
│  Go           │     arr.filter((v, i) => arr.indexOf(v) === i); │
│  Rust         │                                                 │
│               │   // 性能最优方案                                 │
│  ── 标签 ───  │   const unique3 = arr => {                      │
│  #常用        │     const map = new Map();                      │
│  #工具函数    │     return arr.filter(v => !map.has(v) &&        │
│  #算法        │       map.set(v, 1));                            │
│  #面试题      │   };                                            │
│               │                                                 │
│  ── 收藏 ───  │   ─────────────────────────────────────────────  │
│  ⭐ 数组去重   │   标签: #JavaScript #数组 #常用                  │
│  ⭐ 防抖节流   │   创建: 2026-03-20  浏览: 128次                  │
│  ⭐ 深拷贝     │                              [复制] [编辑] [删除] │
│               │                                                 │
├───────────────┴─────────────────────────────────────────────────┤
│  共 156 个片段                                  [列表] [卡片]      │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.4.3 交互规范

- **实时搜索**：输入即时过滤结果
- **语法高亮**：使用 Monaco Editor 或 Prism.js
- **代码格式化**：支持一键格式化代码
- **快捷键**：
  - `Ctrl/Cmd + C`：复制代码
  - `Ctrl/Cmd + N`：新建片段
  - `Ctrl/Cmd + F`：聚焦搜索
  - `Esc`：清空搜索

---

### 2.5 AI助手集成

#### 2.5.1 功能特性

| 功能 | 描述 | 优先级 |
|-----|------|-------|
| 对话聊天 | 与AI进行文本对话 | P0 |
| 上下文记忆 | 多轮对话上下文保持 | P0 |
| 模型切换 | 支持多种AI模型选择 | P1 |
| 对话历史 | 保存和查看历史对话 | P1 |
| 导出分享 | 导出对话内容 | P2 |
| Prompt模板 | 预设Prompt模板库 | P2 |
| 文档关联 | 关联Markdown文档提问 | P2 |

#### 2.5.2 UI设计

```
┌─────────────────────────────────────────────────────────────────┐
│  🤖 AI助手                                   [新对话] [历史] [设置] │
├───────────────┬─────────────────────────────────────────────────┤
│               │                                                 │
│  ── 今日 ───  │   ┌─────────────────────────────────────────┐   │
│  💬 帮助写代码 │   │ 🤖 AI                                   │   │
│  💬 文档润色   │   │                                         │   │
│               │   │ 你好！我是你的AI助手，可以帮助你：        │   │
│  ── 昨天 ───  │   │                                         │   │
│  💬 翻译文档   │   │ • 📝 写作润色和内容创作                  │   │
│  💬 代码调试   │   │ • 💻 代码编写和问题解答                  │   │
│               │   │ • 📚 知识问答和学习辅导                  │   │
│  ── 更早 ───  │   │ • 🌐 翻译和语言处理                      │   │
│  💬 头脑风暴   │   │                                         │   │
│  💬 项目规划   │   │ 有什么我可以帮助你的吗？                 │   │
│               │   │                                         │   │
│               │   └─────────────────────────────────────────┘   │
│               │                                                 │
│               │   ┌─────────────────────────────────────────┐   │
│               │   │ 👤 用户                                 │   │
│               │   │                                         │   │
│               │   │ 帮我写一个防抖函数                       │   │
│               │   │                                         │   │
│               │   └─────────────────────────────────────────┘   │
│               │                                                 │
├───────────────┴─────────────────────────────────────────────────┤
│  模型: [GPT-4 ▼]  温度: 0.7 ────────●──────── 1.0               │
│                                                                 │
│  ┌───────────────────────────────────────────────────┐ [发送]   │
│  │ 输入你的问题...                                    │         │
│  └───────────────────────────────────────────────────┘         │
│  [📎 上传] [🔗 关联文档] [📋 模板]                              │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.5.3 交互规范

- **流式输出**：AI回复采用流式输出，逐字显示
- **停止生成**：支持中途停止生成
- **重新生成**：对回复不满意可重新生成
- **复制回复**：一键复制AI回复内容
- **快捷键**：
  - `Enter`：发送消息
  - `Shift + Enter`：换行
  - `Ctrl/Cmd + N`：新对话

---

## 3. 整体布局设计

### 3.1 导航结构

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────┐                                         用户头像 ┌───┐ │
│  │Logo │  智能创意工作室                     [🔔] [⚙️] │头像│ │
│  └─────┘                                                   └───┘ │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────┐                                                 │
│  │ 📝 文档   │                                                 │
│  │ 🧠 思维导图│                                                 │
│  │ ✅ 待办   │                                                 │
│  │ 💻 代码库 │              主内容区域                          │
│  │ 🤖 AI助手 │                                                 │
│  │           │                                                 │
│  │ ─────────│                                                 │
│  │ 📁 文件夹 │                                                 │
│  │ ⭐ 收藏   │                                                 │
│  │ 🗑️ 回收站 │                                                 │
│  │           │                                                 │
│  │           │                                                 │
│  │ + 新建    │                                                 │
│  └───────────┘                                                 │
│                                                                 │
│  [收起侧边栏]                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 响应式设计

| 断点 | 宽度 | 布局调整 |
|-----|------|---------|
| Desktop | ≥1200px | 侧边栏固定，主内容自适应 |
| Tablet | 768-1199px | 侧边栏可折叠，主内容全宽 |
| Mobile | <768px | 底部导航栏，抽屉式侧边栏 |

---

## 4. 数据结构设计

### 4.1 用户模块

```typescript
// 用户信息
interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
}

// 用户设置
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'zh-CN' | 'en-US';
  editorSettings: EditorSettings;
  pomodoroSettings: PomodoroSettings;
  aiSettings: AISettings;
}
```

### 4.2 文档模块

```typescript
// Markdown文档
interface Document {
  id: string;
  userId: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
  isStarred: boolean;
  wordCount: number;
  versions: DocumentVersion[];
  createdAt: Date;
  updatedAt: Date;
}

// 文档版本
interface DocumentVersion {
  id: string;
  documentId: string;
  content: string;
  createdAt: Date;
}

// 文件夹
interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 思维导图模块

```typescript
// 思维导图
interface MindMap {
  id: string;
  userId: string;
  title: string;
  rootNode: MindMapNode;
  theme: MindMapTheme;
  layout: 'tree' | 'radial' | 'organic';
  createdAt: Date;
  updatedAt: Date;
}

// 节点
interface MindMapNode {
  id: string;
  text: string;
  children: MindMapNode[];
  style?: NodeStyle;
  collapsed?: boolean;
  note?: string;
  link?: string;
}

// 节点样式
interface NodeStyle {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  borderRadius?: number;
}
```

### 4.4 待办模块

```typescript
// 任务
interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  dueDate?: Date;
  completedAt?: Date;
  subtasks: SubTask[];
  pomodoroCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 子任务
interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

// 番茄钟记录
interface PomodoroSession {
  id: string;
  userId: string;
  taskId?: string;
  startTime: Date;
  endTime: Date;
  type: 'focus' | 'short_break' | 'long_break';
  completed: boolean;
}
```

### 4.5 代码片段模块

```typescript
// 代码片段
interface CodeSnippet {
  id: string;
  userId: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  tags: string[];
  isStarred: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 支持的编程语言
type ProgrammingLanguage = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'cpp'
  | 'c'
  | 'csharp'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'sql'
  | 'bash'
  | 'json'
  | 'yaml'
  | 'markdown'
  | 'html'
  | 'css'
  | 'scss'
  | string;
```

### 4.6 AI对话模块

```typescript
// 对话会话
interface Conversation {
  id: string;
  userId: string;
  title: string;
  model: AIModel;
  messages: Message[];
  linkedDocuments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 消息
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens?: number;
  createdAt: Date;
}

// AI模型配置
interface AIModel {
  provider: 'openai' | 'anthropic' | 'google' | 'custom';
  model: string;
  temperature: number;
  maxTokens: number;
}
```

---

## 5. API接口设计

### 5.1 接口规范

- **基础路径**: `/api/v1`
- **认证方式**: Bearer Token (JWT)
- **响应格式**: JSON
- **错误处理**: 统一错误响应格式

```typescript
// 统一响应格式
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

### 5.2 用户接口

```
POST   /api/v1/auth/register      # 注册
POST   /api/v1/auth/login         # 登录
POST   /api/v1/auth/logout        # 登出
POST   /api/v1/auth/refresh       # 刷新Token
GET    /api/v1/users/me           # 获取当前用户信息
PUT    /api/v1/users/me           # 更新用户信息
PUT    /api/v1/users/me/settings  # 更新用户设置
```

### 5.3 文档接口

```
GET    /api/v1/documents                    # 获取文档列表
POST   /api/v1/documents                    # 创建文档
GET    /api/v1/documents/:id                # 获取文档详情
PUT    /api/v1/documents/:id                # 更新文档
DELETE /api/v1/documents/:id                # 删除文档
POST   /api/v1/documents/:id/star           # 收藏文档
DELETE /api/v1/documents/:id/star           # 取消收藏
GET    /api/v1/documents/:id/versions       # 获取版本历史
POST   /api/v1/documents/:id/versions       # 创建版本快照

GET    /api/v1/folders                      # 获取文件夹列表
POST   /api/v1/folders                      # 创建文件夹
PUT    /api/v1/folders/:id                  # 更新文件夹
DELETE /api/v1/folders/:id                  # 删除文件夹
```

### 5.4 思维导图接口

```
GET    /api/v1/mindmaps                     # 获取思维导图列表
POST   /api/v1/mindmaps                     # 创建思维导图
GET    /api/v1/mindmaps/:id                 # 获取思维导图详情
PUT    /api/v1/mindmaps/:id                 # 更新思维导图
DELETE /api/v1/mindmaps/:id                 # 删除思维导图
POST   /api/v1/mindmaps/:id/export          # 导出思维导图(PNG/SVG)
```

### 5.5 待办接口

```
GET    /api/v1/tasks                        # 获取任务列表
POST   /api/v1/tasks                        # 创建任务
GET    /api/v1/tasks/:id                    # 获取任务详情
PUT    /api/v1/tasks/:id                    # 更新任务
DELETE /api/v1/tasks/:id                    # 删除任务
PUT    /api/v1/tasks/:id/status             # 更新任务状态

GET    /api/v1/pomodoros                    # 获取番茄钟历史
POST   /api/v1/pomodoros/start              # 开始番茄钟
PUT    /api/v1/pomodoros/:id/complete       # 完成番茄钟
PUT    /api/v1/pomodoros/:id/interrupt      # 中断番茄钟
GET    /api/v1/pomodoros/stats              # 获取番茄钟统计
```

### 5.6 代码片段接口

```
GET    /api/v1/snippets                     # 获取代码片段列表
POST   /api/v1/snippets                     # 创建代码片段
GET    /api/v1/snippets/:id                 # 获取代码片段详情
PUT    /api/v1/snippets/:id                 # 更新代码片段
DELETE /api/v1/snippets/:id                 # 删除代码片段
POST   /api/v1/snippets/:id/star            # 收藏代码片段
DELETE /api/v1/snippets/:id/star            # 取消收藏
GET    /api/v1/snippets/search              # 搜索代码片段
GET    /api/v1/snippets/languages           # 获取支持的编程语言
```

### 5.7 AI助手接口

```
POST   /api/v1/ai/chat                      # 发送消息(流式响应)
GET    /api/v1/conversations                # 获取对话列表
POST   /api/v1/conversations                # 创建对话
GET    /api/v1/conversations/:id            # 获取对话详情
DELETE /api/v1/conversations/:id            # 删除对话
PUT    /api/v1/conversations/:id/title      # 更新对话标题
GET    /api/v1/ai/models                    # 获取可用模型列表
POST   /api/v1/ai/templates                 # 获取Prompt模板
```

---

## 6. 配色方案

### 6.1 主题色

科技感蓝色主题，传达专业、可信赖的品牌形象。

```css
:root {
  /* 主色调 - 科技蓝 */
  --primary-50: #eff6ff;    /* 最浅背景 */
  --primary-100: #dbeafe;   /* 悬浮背景 */
  --primary-200: #bfdbfe;   /* 边框 */
  --primary-300: #93c5fd;   /* 禁用状态 */
  --primary-400: #60a5fa;   /* 图标、辅助元素 */
  --primary-500: #3b82f6;   /* 主按钮、链接 */
  --primary-600: #2563eb;   /* 主按钮hover */
  --primary-700: #1d4ed8;   /* 主按钮active */
  --primary-800: #1e40af;   /* 深色强调 */
  --primary-900: #1e3a8a;   /* 最深 */

  /* 辅助色 - 青色 */
  --accent-400: #22d3ee;
  --accent-500: #06b6d4;
  --accent-600: #0891b2;

  /* 中性色 */
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
}
```

### 6.2 功能色

```css
:root {
  /* 成功 */
  --success-light: #dcfce7;
  --success: #22c55e;
  --success-dark: #16a34a;

  /* 警告 */
  --warning-light: #fef3c7;
  --warning: #f59e0b;
  --warning-dark: #d97706;

  /* 错误 */
  --error-light: #fee2e2;
  --error: #ef4444;
  --error-dark: #dc2626;

  /* 信息 */
  --info-light: #dbeafe;
  --info: #3b82f6;
  --info-dark: #2563eb;
}
```

### 6.3 深色模式

```css
[data-theme="dark"] {
  /* 背景 */
  --bg-primary: #0f172a;      /* 主背景 */
  --bg-secondary: #1e293b;    /* 次级背景 */
  --bg-tertiary: #334155;     /* 卡片背景 */
  --bg-elevated: #1e293b;     /* 浮层背景 */

  /* 文字 */
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --text-disabled: #64748b;

  /* 边框 */
  --border-light: #334155;
  --border-default: #475569;
  --border-strong: #64748b;

  /* 主色调调整 */
  --primary-500: #60a5fa;
  --primary-600: #3b82f6;
  --primary-700: #2563eb;
}
```

### 6.4 渐变色

```css
/* 主渐变 - 品牌渐变 */
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);

/* 卡片渐变 - 微妙背景 */
--gradient-card: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);

/* 按钮渐变 */
--gradient-button: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);

/* 背景装饰 */
--gradient-bg: radial-gradient(ellipse at top, #1e3a8a 0%, #0f172a 100%);
```

### 6.5 阴影系统

```css
/* 卡片阴影 */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* 主色调阴影 - 用于主按钮 */
--shadow-primary: 0 4px 14px 0 rgba(59, 130, 246, 0.4);

/* 深色模式阴影 */
--shadow-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
```

---

## 7. 设计规范

### 7.1 字体系统

```css
/* 主字体 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 代码字体 */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;

/* 字号 */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */

/* 行高 */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* 字重 */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 7.2 间距系统

```css
/* 基于 4px 网格 */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /*