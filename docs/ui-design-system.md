# IP Architect Hub - UI 设计系统

> 高级暗黑风 SaaS 产品界面设计

## 📐 设计理念

**核心原则**：不要炫技，要像"生产力工具"

参考标杆：
- **Notion** - 信息架构清晰
- **Linear** - 极简高级质感
- **Figma** - 专业工作区

---

## 🎨 配色系统

### 主色调

```css
/* 背景色系统 */
--bg-primary: #0B0F14;      /* 主背景 - 深黑 */
--bg-secondary: #0D1117;    /* 次级背景 */
--bg-tertiary: #11161C;     /* 卡片背景 - 深灰 */
--bg-elevated: #161B22;     /* 悬浮层背景 */

/* 文字色系统 */
--text-primary: #E6EDF3;    /* 主文字 - 高对比浅色 */
--text-secondary: #9BA7B4;  /* 次级文字 */
--text-tertiary: #6E7681;   /* 辅助文字 */
--text-placeholder: #484F58; /* 占位符文字 */

/* 强调色系统 */
--accent-primary: #4F46E5;  /* 主强调 - 蓝紫 */
--accent-secondary: #7C3AED; /* 次强调 - 紫色 */
--accent-gradient: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);

/* 状态色 */
--success: #10B981;         /* 成功 - 绿 */
--warning: #F59E0B;         /* 警告 - 橙 */
--error: #EF4444;           /* 错误 - 红 */
--info: #3B82F6;            /* 信息 - 蓝 */

/* 分割线和边框 */
--border-subtle: rgba(255, 255, 255, 0.06);  /* 极细边框 */
--border-default: rgba(255, 255, 255, 0.1);  /* 默认边框 */
--border-strong: rgba(255, 255, 255, 0.15);  /* 强边框 */
```

---

## 📐 布局系统

### 整体布局（三栏式）

```
┌─────────────────────────────────────────────────────────────────┐
│  顶部导航栏 (60px)                                               │
│  ┌──────────────┬─────────────────────────┬──────────────────┐ │
│  │ Logo + 搜索   │  Tab栏                │  用户 + 状态      │ │
│  └──────────────┴─────────────────────────┴──────────────────┘ │
├──────┬───────────────────────────────────────┬─────────────────┤
│      │                                       │                 │
│ 左侧 │           主工作区                    │   右侧         │
│ 导航 │      (内容展示 + 操作区)              │  AI 输出区      │
│      │                                       │                 │
│ 240px│           自适应宽度                  │     320px       │
│      │                                       │                 │
│      │                                       │                 │
└──────┴───────────────────────────────────────┴─────────────────┘
```

### 尺寸规范

```css
/* 间距系统 */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* 圆角系统 */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;

/* 阴影系统 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(79, 70, 229, 0.3); /* 蓝紫发光 */
```

---

## 🧩 核心组件设计

### 1. 按钮（Button）

#### 主要按钮（Primary Button）

```css
.btn-primary {
  /* 渐变背景 */
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);

  /* 圆角和尺寸 */
  border-radius: 12px;
  padding: 12px 24px;
  height: 44px;

  /* 文字 */
  color: #FFFFFF;
  font-weight: 600;
  font-size: 14px;

  /* 边框（极细） */
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* 阴影 */
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  /* 过渡 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover 状态 */
.btn-primary:hover {
  /* 轻微上浮 */
  transform: translateY(-1px);

  /* 发光效果 */
  box-shadow:
    0 4px 12px rgba(79, 70, 229, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  /* 渐变流动感 */
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
}

/* Active 状态 */
.btn-primary:active {
  /* 轻微缩小 */
  transform: translateY(0) scale(0.98);
}
```

#### 次要按钮（Secondary Button）

```css
.btn-secondary {
  /* 透明背景 */
  background: rgba(255, 255, 255, 0.03);

  /* 边框 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 24px;
  height: 44px;

  /* 文字 */
  color: #E6EDF3;
  font-weight: 500;
  font-size: 14px;

  /* 过渡 */
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  /* 背景变亮 */
  background: rgba(255, 255, 255, 0.06);

  /* 边框发光 */
  border-color: rgba(255, 255, 255, 0.15);

  /* 微光效果 */
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}
```

---

### 2. 卡片（Card）

```css
.card {
  /* 背景 */
  background: #11161C;

  /* 圆角 */
  border-radius: 16px;

  /* 边框（极细） */
  border: 1px solid rgba(255, 255, 255, 0.06);

  /* 阴影 */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(0, 0, 0, 0.2) inset;

  /* 内边距 */
  padding: 24px;

  /* 过渡 */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover 状态 */
.card:hover {
  /* 轻微上浮 */
  transform: translateY(-2px);

  /* 阴影加深 */
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(0, 0, 0, 0.2) inset;

  /* 边框发光（极细） */
  border-color: rgba(79, 70, 229, 0.2);
}
```

#### 玻璃拟态卡片（Glass Card）

```css
.card-glass {
  /* 半透明背景 */
  background: rgba(17, 22, 28, 0.6);

  /* 背景模糊 */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* 边框 */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;

  /* 阴影 */
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  padding: 24px;
}
```

---

### 3. 输入框（Input）

```css
.input {
  /* 背景 */
  background: #0D1117;

  /* 边框（极细） */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;

  /* 尺寸 */
  padding: 12px 16px;
  height: 44px;

  /* 文字 */
  color: #E6EDF3;
  font-size: 14px;
  font-weight: 400;

  /* 占位符 */
  &::placeholder {
    color: #484F58;
  }

  /* 过渡 */
  transition: all 0.15s ease;
}

/* Focus 状态 */
.input:focus {
  /* 背景 */
  background: #0D1117;

  /* 边框发光 */
  border-color: #7C3AED;
  box-shadow:
    0 0 0 3px rgba(124, 58, 237, 0.1),
    0 0 0 1px rgba(124, 58, 237, 0.3);

  /* 外发光（极细） */
  outline: none;
}
```

---

### 4. 导航栏（Navigation）

#### 左侧导航

```css
.nav-sidebar {
  /* 背景 */
  background: #0B0F14;

  /* 右边框 */
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  /* 尺寸 */
  width: 240px;
  height: 100%;
}

/* 导航项 */
.nav-item {
  /* 布局 */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;

  /* 圆角 */
  border-radius: 8px;

  /* 文字 */
  color: #9BA7B4;
  font-size: 14px;
  font-weight: 500;

  /* 过渡 */
  transition: all 0.15s ease;
}

/* Hover 状态 */
.nav-item:hover {
  /* 背景（极淡） */
  background: rgba(255, 255, 255, 0.03);

  /* 文字变亮 */
  color: #E6EDF3;
}

/* 激活状态 */
.nav-item.active {
  /* 渐变背景（极淡） */
  background: linear-gradient(90deg,
    rgba(79, 70, 229, 0.1) 0%,
    rgba(124, 58, 237, 0.05) 100%
  );

  /* 文字 */
  color: #E6EDF3;

  /* 左侧指示条 */
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
    background: linear-gradient(180deg, #4F46E5 0%, #7C3AED 100%);
    border-radius: 0 2px 2px 0;
  }
}
```

---

## 📱 页面结构

### 顶部导航栏（60px）

```css
.topbar {
  /* 背景（轻微半透明） */
  background: rgba(11, 15, 20, 0.8);
  backdrop-filter: blur(20px);

  /* 下边框 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  /* 高度 */
  height: 60px;

  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* Logo */
.logo {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

/* 搜索栏 */
.search-bar {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 8px 16px;
  width: 320px;
  height: 40px;

  display: flex;
  align-items: center;
  gap: 8px;

  color: #6E7681;
  font-size: 14px;

  transition: all 0.15s ease;
}

.search-bar:focus-within {
  border-color: rgba(79, 70, 229, 0.3);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.05);
}
```

---

## 🎯 动效规范

### 微动效

```css
/* 卡片 Hover 上浮 */
@keyframes card-float {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2px);
  }
}

/* 渐变流动 */
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 脉冲发光 */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0);
  }
}

/* 使用示例 */
.btn-primary:hover {
  animation: glow-pulse 1.5s infinite;
}
```

---

## 📐 响应式断点

```css
/* 移动端 */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    height: auto;
  }

  .ai-panel {
    display: none; /* 移动端隐藏右侧面板 */
  }
}

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-sidebar {
    width: 200px;
  }

  .ai-panel {
    width: 280px;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  /* 默认样式 */
}
```

---

## 🎭 状态设计

### 加载状态

```css
/* 骨架屏 */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 加载 Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: #7C3AED;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## 🌟 特殊效果

### 背景纹理

```css
/* 极轻微噪点 */
.bg-noise {
  position: relative;
}

.bg-noise::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

### 光晕效果

```css
/* AI 输出区的光晕 */
.glow-accent {
  position: relative;
}

.glow-accent::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(79, 70, 229, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
  animation: glow-pulse 3s ease-in-out infinite;
}
```

---

## 📏 字体系统

```css
/* 字体族 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
             'Droid Sans', 'Helvetica Neue', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono',
             'Courier New', monospace;

/* 中文字体 */
--font-zh: 'HarmonyOS Sans', 'PingFang SC', 'Microsoft YaHei',
           '思源黑体', sans-serif;

/* 字号 */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* 字重 */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🎨 Tailwind CSS 配置

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 背景色
        bg: {
          primary: '#0B0F14',
          secondary: '#0D1117',
          tertiary: '#11161C',
          elevated: '#161B22',
        },

        // 文字色
        text: {
          primary: '#E6EDF3',
          secondary: '#9BA7B4',
          tertiary: '#6E7681',
          placeholder: '#484F58',
        },

        // 强调色
        accent: {
          primary: '#4F46E5',
          secondary: '#7C3AED',
        },
      },

      // 阴影
      boxShadow: {
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 70, 229, 0.4)',
      },

      // 背景模糊
      backdropBlur: {
        xs: '2px',
      },

      // 动画
      animation: {
        'float': 'float 0.3s ease-out',
        'glow-pulse': 'glow-pulse 1.5s infinite',
        'gradient-flow': 'gradient-flow 3s ease infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.4)' },
          '50%': { boxShadow: '0 0 0 4px rgba(79, 70, 229, 0)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

---

## 📋 组件清单

### 基础组件

- ✅ Button（按钮）
- ✅ Input（输入框）
- ✅ Card（卡片）
- ✅ Navigation（导航）
- ✅ SearchBar（搜索栏）
- ✅ Avatar（头像）
- ✅ Badge（徽章）
- ✅ Divider（分割线）
- ✅ Tooltip（提示）

### 复合组件

- 📝 ContentCard（内容卡片）
- 📊 DataChart（数据图表）
- 💬 ChatBubble（聊天气泡）
- 📋 TaskList（任务列表）
- 🔔 Notification（通知）
- 📈 StatCard（统计卡片）
- 🎨 ColorPicker（颜色选择器）
- 📅 DatePicker（日期选择器）

### 页面组件

- 🏠 Dashboard（仪表盘）
- 📊 Analytics（数据分析）
- ✍️ Editor（编辑器）
- 📁 FileExplorer（文件浏览器）
- ⚙️ Settings（设置）

---

## 🎯 设计检查清单

在开发过程中，确保：

- [ ] 所有颜色符合配色系统
- [ ] 间距使用统一的 spacing scale
- [ ] 圆角使用统一的 radius scale
- [ ] 所有交互状态都有反馈（hover/active/focus）
- [ ] 文字对比度符合 WCAG AA 标准
- [ ] 动效时长控制在 200-300ms
- [ ] 避免使用纯黑/纯白
- [ ] 保持足够的留白空间
- [ ] 响应式设计适配主要断点
- [ ] 性能优化（避免过多的阴影和模糊）

---

## 📚 参考资源

- **Linear**: https://linear.app
- **Notion**: https://notion.so
- **Figma**: https://figma.com
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com

---

**版本**: v1.0
**更新时间**: 2026-03-25
