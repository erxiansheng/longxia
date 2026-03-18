# 小龙虾任务平台 UI/UX 设计规范

> 设计版本: v1.0  
> 更新日期: 2026-03-18  
> 设计目标: 打造现代化、有设计感的小龙虾主题任务平台

---

## 目录

1. [设计理念](#1-设计理念)
2. [配色方案](#2-配色方案)
3. [排版规范](#3-排版规范)
4. [组件设计](#4-组件设计)
5. [页面设计](#5-页面设计)
6. [交互动效](#6-交互动效)
7. [响应式设计](#7-响应式设计)
8. [CSS 代码规范](#8-css-代码规范)

---

## 1. 设计理念

### 1.1 核心原则

- **主题一致性**: 以小龙虾为核心视觉元素，红色/橙色贯穿全局
- **现代简约**: 去除冗余，保留核心功能，界面清爽
- **卡片化设计**: 信息模块化，层次分明
- **微交互**: 每一个操作都有反馈，提升用户体验
- **情感化设计**: 融入小龙虾元素，增加趣味性和品牌识别度

### 1.2 设计灵感来源

- Dribbble 现代卡片式布局
- Behance 渐变配色方案
- Material Design 阴影与层次
- iOS 设计语言的圆润与通透

---

## 2. 配色方案

### 2.1 主色板

```css
:root {
  /* 主色 - 龙虾红 */
  --primary: #FF6B6B;
  --primary-light: #FF8E8E;
  --primary-dark: #E85555;
  
  /* 辅色 - 浅橙 */
  --secondary: #FFA07A;
  --secondary-light: #FFB899;
  --secondary-dark: #E88A66;
  
  /* 背景色 */
  --bg-primary: #FFF5F5;
  --bg-secondary: #FFFFFF;
  --bg-card: #FFFFFF;
  --bg-hover: #FFF0F0;
  
  /* 强调色 - 深红 */
  --accent: #D32F2F;
  --accent-light: #EF5350;
  --accent-dark: #B71C1C;
  
  /* 文字色 */
  --text-primary: #2D3436;
  --text-secondary: #636E72;
  --text-muted: #B2BEC3;
  --text-inverse: #FFFFFF;
  
  /* 状态色 */
  --success: #00B894;
  --warning: #FDCB6E;
  --error: #E17055;
  --info: #74B9FF;
  
  /* 边框色 */
  --border-light: #FADBD8;
  --border-medium: #F5B7B1;
  
  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(255, 107, 107, 0.1);
  --shadow-md: 0 4px 16px rgba(255, 107, 107, 0.15);
  --shadow-lg: 0 8px 32px rgba(255, 107, 107, 0.2);
  --shadow-xl: 0 16px 48px rgba(255, 107, 107, 0.25);
}
```

### 2.2 渐变定义

```css
:root {
  /* 主渐变 - 龙虾渐变 */
  --gradient-primary: linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%);
  --gradient-primary-hover: linear-gradient(135deg, #FF8E8E 0%, #FFB899 100%);
  
  /* 热情渐变 */
  --gradient-passion: linear-gradient(135deg, #D32F2F 0%, #FF6B6B 50%, #FFA07A 100%);
  
  /* 背景渐变 */
  --gradient-bg: linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%);
  
  /* 卡片渐变 */
  --gradient-card: linear-gradient(145deg, #FFFFFF 0%, #FFF5F5 100%);
  
  /* 按钮渐变 */
  --gradient-btn: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  
  /* 高亮渐变 */
  --gradient-highlight: linear-gradient(90deg, transparent 0%, rgba(255, 107, 107, 0.1) 50%, transparent 100%);
}
```

### 2.3 透明度变体

```css
:root {
  --primary-10: rgba(255, 107, 107, 0.1);
  --primary-20: rgba(255, 107, 107, 0.2);
  --primary-30: rgba(255, 107, 107, 0.3);
  --primary-50: rgba(255, 107, 107, 0.5);
  
  --overlay-light: rgba(255, 245, 245, 0.95);
  --overlay-dark: rgba(45, 52, 54, 0.5);
}
```

---

## 3. 排版规范

### 3.1 字体家族

```css
:root {
  /* 主字体 - 现代无衬线 */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  
  /* 标题字体 */
  --font-heading: 'Poppins', 'Inter', 'PingFang SC', sans-serif;
  
  /* 等宽字体 */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  
  /* 数字字体 */
  --font-number: 'DIN Alternate', 'Inter', sans-serif;
}
```

### 3.2 字号系统

```css
:root {
  /* 标题字号 */
  --text-h1: 2.5rem;    /* 40px - 页面主标题 */
  --text-h2: 2rem;      /* 32px - 区块标题 */
  --text-h3: 1.5rem;    /* 24px - 卡片标题 */
  --text-h4: 1.25rem;   /* 20px - 小标题 */
  --text-h5: 1.125rem;  /* 18px - 次级标题 */
  
  /* 正文字号 */
  --text-lg: 1.125rem;  /* 18px - 大正文 */
  --text-base: 1rem;    /* 16px - 正文 */
  --text-sm: 0.875rem;  /* 14px - 小字 */
  --text-xs: 0.75rem;   /* 12px - 辅助文字 */
}
```

### 3.3 字重与行高

```css
:root {
  /* 字重 */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}
```

### 3.4 排版样式

```css
/* 标题样式 */
.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.heading-3 {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

/* 正文样式 */
.body-lg {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-regular);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

.body-base {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

.body-sm {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* 数字强调 */
.number-highlight {
  font-family: var(--font-number);
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 4. 组件设计

### 4.1 按钮组件

```css
/* 基础按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 主按钮 */
.btn-primary {
  background: var(--gradient-btn);
  color: var(--text-inverse);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* 次要按钮 */
.btn-secondary {
  background: var(--bg-secondary);
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-10);
  transform: translateY(-2px);
}

/* 幽灵按钮 */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--primary-10);
  color: var(--primary);
}

/* 大按钮 */
.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--text-lg);
  border-radius: 16px;
}

/* 小按钮 */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
  border-radius: 8px;
}

/* 图标按钮 */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 12px;
}

/* 按钮涟漪效果 */
.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:active::after {
  width: 200%;
  height: 200%;
}
```

### 4.2 卡片组件

```css
/* 基础卡片 */
.card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card:hover::before {
  opacity: 1;
}

/* 任务卡片 */
.task-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.task-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.task-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.task-card-title {
  font-size: var(--text-h4);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
}

.task-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: var(--gradient-primary);
  color: white;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: 20px;
}

.task-card-reward {
  font-family: var(--font-number);
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.task-card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* 统计卡片 */
.stat-card {
  background: var(--gradient-card);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.stat-card-value {
  font-family: var(--font-number);
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.stat-card-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

/* 用户卡片 */
.user-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.user-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.user-card-avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-h3);
  color: white;
  font-weight: var(--font-bold);
}

/* 排名卡片 */
.rank-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.rank-card:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
}

.rank-card-position {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
}

.rank-card-position.gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: white;
}

.rank-card-position.silver {
  background: linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%);
  color: white;
}

.rank-card-position.bronze {
  background: linear-gradient(135deg, #CD7F32 0%, #B87333 100%);
  color: white;
}

.rank-card-position.normal {
  background: var(--primary-10);
  color: var(--primary);
}
```

### 4.3 输入框组件

```css
/* 基础输入框 */
.input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-10);
}

.input::placeholder {
  color: var(--text-muted);
}

/* 搜索框 */
.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
  background: white;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

/* 文本域 */
.textarea {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: 16px;
  outline: none;
  resize: vertical;
  transition: all 0.3s ease;
}

.textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-10);
}

/* 表单组 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-hint {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: 0.25rem;
}
```

### 4.4 徽章与标签

```css
/* 基础徽章 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: 20px;
}

.badge-primary {
  background: var(--gradient-primary);
  color: white;
}

.badge-secondary {
  background: var(--primary-10);
  color: var(--primary);
}

.badge-success {
  background: rgba(0, 184, 148, 0.1);
  color: var(--success);
}

.badge-warning {
  background: rgba(253, 203, 110, 0.2);
  color: #E17055;
}

/* 技能标签 */
.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.skill-tag:hover {
  background: var(--primary-10);
  border-color: var(--primary-light);
  color: var(--primary);
}

.skill-tag.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
}

/* 状态标签 */
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: 8px;
}

.status-tag::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-tag.pending {
  background: rgba(116, 185, 255, 0.1);
  color: var(--info);
}

.status-tag.pending::before {
  background: var(--info);
}

.status-tag.active {
  background: rgba(0, 184, 148, 0.1);
  color: var(--success);
}

.status-tag.active::before {
  background: var(--success);
  animation: pulse 2s infinite;
}

.status-tag.completed {
  background: rgba(255, 107, 107, 0.1);
  color: var(--primary);
}

.status-tag.completed::before {
  background: var(--primary);
}
```

### 4.5 进度条

```css
/* 基础进度条 */
.progress {
  width: 100%;
  height: 8px;
  background: var(--border-light);
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 圆形进度 */
.progress-circle {
  width: 120px;
  height: 120px;
  position: relative;
}

.progress-circle svg {
  transform: rotate(-90deg);
}

.progress-circle-bg {
  fill: none;
  stroke: var(--border-light);
  stroke-width: 8;
}

.progress-circle-bar {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 314;
  stroke-dashoffset: 314;
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-number);
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  color: var(--primary);
}

/* 步骤进度条 */
.steps-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.steps-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border-light);
  z-index: 0;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-item-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.step-item.completed .step-item-dot {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
}

.step-item.active .step-item-dot {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-10);
}

.step-item-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: 0.5rem;
  text-align: center;
}

.step-item.active .step-item-label,
.step-item.completed .step-item-label {
  color: var(--text-primary);
}
```

---

## 5. 页面设计

### 5.1 首页 - 任务大厅

```html
<!-- 页面结构 -->
<div class="page-home">
  <!-- 顶部导航 -->
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <span class="logo-icon">🦞</span>
        <span class="logo-text">小龙虾任务平台</span>
      </div>
      <nav class="nav">
        <a href="#" class="nav-item active">任务大厅</a>
        <a href="#" class="nav-item">排行榜</a>
        <a href="#" class="nav-item">个人中心</a>
      </nav>
      <div class="header-actions">
        <button class="btn btn-primary">发布任务</button>
      </div>
    </div>
  </header>

  <!-- 主内容区 -->
  <main class="main">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          发现精彩任务
          <span class="hero-title-highlight">赚取丰厚奖励</span>
        </h1>
        <p class="hero-subtitle">加入小龙虾社区，完成任务，获取报酬</p>
        
        <!-- 搜索框 -->
        <div class="search-wrapper search-hero">
          <svg class="search-icon" width="20" height="20">...</svg>
          <input type="text" class="search-input" placeholder="搜索任务、技能、用户...">
          <button class="btn btn-primary search-btn">搜索</button>
        </div>
        
        <!-- 快速筛选 -->
        <div class="quick-filters">
          <button class="skill-tag active">全部任务</button>
          <button class="skill-tag">数据标注</button>
          <button class="skill-tag">问卷调查</button>
          <button class="skill-tag">内容审核</button>
          <button class="skill-tag">AI训练</button>
        </div>
      </div>
      
      <!-- 小龙虾装饰动画 -->
      <div class="hero-decoration">
        <div class="crayfish-animation">🦞</div>
      </div>
    </section>

    <!-- 筛选栏 -->
    <section class="filters-section">
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">任务类型</label>
          <select class="input filter-select">
            <option>全部类型</option>
            <option>数据标注</option>
            <option>问卷调查</option>
            <option>内容审核</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">奖励范围</label>
          <select class="input filter-select">
            <option>不限</option>
            <option>0-10元</option>
            <option>10-50元</option>
            <option>50元以上</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">排序方式</label>
          <select class="input filter-select">
            <option>最新发布</option>
            <option>奖励最高</option>
            <option>最热门</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 任务网格 -->
    <section class="tasks-section">
      <div class="tasks-grid">
        <!-- 任务卡片 -->
        <div class="task-card">
          <div class="task-card-header">
            <h3 class="task-card-title">图像分类标注</h3>
            <span class="task-card-badge">热门</span>
          </div>
          <p class="task-card-desc">对图片进行分类标注，识别图片中的主要对象</p>
          <div class="task-card-reward">¥5.00</div>
          <div class="task-card-meta">
            <span>⏱ 约10分钟</span>
            <span>👥 128人参与</span>
            <span>⭐ 4.8</span>
          </div>
        </div>
        
        <!-- 更多任务卡片... -->
      </div>
    </section>

    <!-- 加载更多 -->
    <div class="load-more">
      <button class="btn btn-secondary btn-lg">加载更多任务</button>
    </div>
  </main>
</div>
```

```css
/* 首页样式 */
.page-home {
  min-height: 100vh;
  background: var(--gradient-bg);
}

/* 头部导航 */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
  animation: wiggle 2s infinite;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: var(--font-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--primary);
  background: var(--primary-10);
}

.nav-item.active {
  color: var(--primary);
  background: var(--primary-10);
}

/* Hero 区域 */
.hero {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: var(--font-bold);
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.hero-title-highlight {
  display: block;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.search-hero {
  max-width: 600px;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
}

.search-hero .search-input {
  flex: 1;
  padding-right: 1rem;
}

.search-btn {
  flex-shrink: 0;
}

.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-decoration {
  flex-shrink: 0;
}

.crayfish-animation {
  font-size: 8rem;
  animation: float 3s ease-in-out infinite;
}

/* 筛选栏 */
.filters-section {
  background: white;
  border-bottom: 1px solid var(--border-light);
  padding: 1.5rem 0;
}

.filters-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  white-space: nowrap;
}

.filter-select {
  min-width: 150px;
  padding: 0.5rem 1rem;
}

/* 任务网格 */
.tasks-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.load-more {
  text-align: center;
  padding: 3rem 0;
}
```

### 5.2 登录/注册页

```html
<div class="page-auth">
  <div class="auth-container">
    <!-- 左侧装饰 -->
    <div class="auth-decoration">
      <div class="auth-pattern"></div>
      <div class="auth-illustration">
        <div class="crayfish-group">
          <span class="crayfish-large">🦞</span>
          <span class="crayfish-small">🦞</span>
          <span class="crayfish-tiny">🦞</span>
        </div>
      </div>
      <div class="auth-quote">
        <h2>加入小龙虾社区</h2>
        <p>发现精彩任务，赚取丰厚奖励</p>
      </div>
    </div>
    
    <!-- 右侧表单 -->
    <div class="auth-form-container">
      <div class="auth-form">
        <div class="auth-header">
          <h1 class="auth-title">欢迎回来</h1>
          <p class="auth-subtitle">登录您的账户继续探索</p>
        </div>
        
        <form class="form">
          <div class="form-group">
            <label class="form-label">手机号/邮箱</label>
            <input type="text" class="input" placeholder="请输入手机号或邮箱">
          </div>
          
          <div class="form-group">
            <label class="form-label">密码</label>
            <input type="password" class="input" placeholder="请输入密码">
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" class="checkbox">
              <span>记住我</span>
            </label>
            <a href="#" class="link">忘记密码?</a>
          </div>
          
          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            登录
          </button>