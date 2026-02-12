# The Growth Matrix Design System

> 基于 happycapy.ai 设计思路，打造温暖、专业、值得信赖的医美 A2A 社区

---

## 设计理念

**核心关键词：**
- 🤝 **信任** - 去中心化的信任机制
- 💝 **温暖** - 消除医美决策焦虑
- 🎯 **确定性** - 从心到脸的确定性变美
- 🔬 **专业** - 六大 Agent 矩阵的科学性

**设计目标：**
1. 让用户感到安全、被理解
2. 传达专业性，但不冰冷
3. 视觉上温暖、亲和，而非医疗冷感
4. 体现 AI 技术，但不过度科技感

---

## 配色方案

### 主色调 - 温暖医美风

```css
/* 背景色系 - 温暖、安全 */
--bg-primary: #FBF9F6;      /* 主背景 - 温暖米白 */
--bg-secondary: #F5F2ED;    /* 次级背景 - 浅米色 */
--bg-card: #FFFFFF;         /* 卡片背景 - 纯白 */

/* 品牌色系 - 专业、信任 */
--brand-primary: #E8D5C4;   /* 香槟金 - 主品牌色 */
--brand-secondary: #C9A88A; /* 深香槟 - 次级品牌色 */
--brand-dark: #A08060;      /* 深棕金 - 强调色 */

/* 文字色系 - 温和、易读 */
--text-primary: #2E2929;    /* 主文字 - 深棕色 */
--text-secondary: #666666;  /* 次级文字 - 中灰 */
--text-tertiary: #999999;   /* 三级文字 - 浅灰 */

/* 功能色系 - 清晰、直观 */
--success: #A8C5A0;         /* 成功/合规 - 信任绿 */
--warning: #E8B86D;         /* 警告/风险 - 琥珀色 */
--error: #D97B7B;           /* 错误/危险 - 柔和红 */
--info: #8AAED6;            /* 信息 - 柔和蓝 */

/* Agent 专属色 - 六大矩阵 */
--agent-psychology: #B8A8D6;    /* 心理 - 紫色 */
--agent-aesthetic: #E8B8C8;     /* 审美 - 粉色 */
--agent-compliance: #A8C5A0;    /* 合规 - 绿色 */
--agent-communication: #8AAED6; /* 沟通 - 蓝色 */
--agent-negotiation: #E8B86D;   /* 博弈 - 橙色 */
--agent-transaction: #C9A88A;   /* 成交 - 金色 */
```

### 配色使用规则

**背景层级：**
```
页面背景 (#FBF9F6)
  ↓
区块背景 (#F5F2ED)
  ↓
卡片背景 (#FFFFFF)
```

**文字层级：**
```
标题/重要信息 (#2E2929)
  ↓
正文/说明 (#666666)
  ↓
辅助信息/时间戳 (#999999)
```

**Agent 识别：**
- 每个 Agent 有专属颜色
- 用于图标、标签、进度条
- 保持一致性，便于用户识别

---

## 字体系统

### 字体家族

```css
/* 标题字体 - 优雅、专业 */
--font-heading: "Instrument Serif", "思源宋体", "Noto Serif SC", serif;

/* 正文字体 - 清晰、易读 */
--font-body: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif;

/* 数字字体 - 等宽、精确 */
--font-mono: "SF Mono", "Consolas", "Monaco", monospace;
```

### 字体大小

```css
/* 标题层级 */
--text-h1: 48px;    /* 主标题 */
--text-h2: 36px;    /* 二级标题 */
--text-h3: 28px;    /* 三级标题 */
--text-h4: 24px;    /* 四级标题 */
--text-h5: 20px;    /* 五级标题 */

/* 正文层级 */
--text-xl: 18px;    /* 大号正文 */
--text-lg: 16px;    /* 标准正文 */
--text-base: 14px;  /* 小号正文 */
--text-sm: 12px;    /* 辅助文字 */
--text-xs: 10px;    /* 极小文字 */
```

### 字重

```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 行高

```css
--leading-tight: 1.2;    /* 标题 */
--leading-normal: 1.5;   /* 正文 */
--leading-relaxed: 1.75; /* 长文本 */
```

---

## 间距系统

```css
/* 基础间距单位：4px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### 使用规则

- **组件内间距：** 4px, 8px, 12px
- **组件间间距：** 16px, 24px, 32px
- **区块间间距：** 48px, 64px, 80px
- **页面边距：** 24px (移动端), 48px (桌面端)

---

## 圆角系统

```css
--radius-sm: 4px;    /* 小圆角 - 标签、徽章 */
--radius-md: 8px;    /* 中圆角 - 按钮、输入框 */
--radius-lg: 12px;   /* 大圆角 - 卡片 */
--radius-xl: 16px;   /* 超大圆角 - 模态框 */
--radius-full: 9999px; /* 完全圆角 - 头像、药丸按钮 */
```

---

## 阴影系统

```css
/* 卡片阴影 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* 悬浮阴影 */
--shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.12);

/* 内阴影 */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
```

---

## 组件设计

### 按钮（Button）

**主按钮（Primary）：**
```css
background: var(--brand-primary);
color: var(--text-primary);
padding: 12px 24px;
border-radius: var(--radius-md);
font-weight: var(--font-semibold);
transition: all 0.2s;

&:hover {
  background: var(--brand-secondary);
  box-shadow: var(--shadow-hover);
}
```

**次要按钮（Secondary）：**
```css
background: transparent;
color: var(--text-primary);
border: 1px solid var(--brand-primary);
padding: 12px 24px;
border-radius: var(--radius-md);
```

**文字按钮（Text）：**
```css
background: transparent;
color: var(--brand-dark);
padding: 8px 16px;
font-weight: var(--font-medium);
```

### 卡片（Card）

```css
background: var(--bg-card);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-md);
transition: all 0.3s;

&:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### 输入框（Input）

```css
background: var(--bg-card);
border: 1px solid #E5E5E5;
border-radius: var(--radius-md);
padding: 12px 16px;
font-size: var(--text-lg);
color: var(--text-primary);

&:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(232, 213, 196, 0.1);
}
```

### Agent 卡片（Agent Card）

```css
.agent-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border-left: 4px solid var(--agent-color);
  box-shadow: var(--shadow-md);
}

.agent-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: var(--agent-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 进度条（Progress）

```css
.progress-bar {
  height: 8px;
  background: #E5E5E5;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  transition: width 0.3s ease;
}
```

---

## 图标系统

### 图标库
- **主要：** Lucide Icons（简洁、现代）
- **辅助：** Heroicons（功能性图标）

### 图标大小
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### 六大 Agent 图标

```
心理 Agent: 🧠 Brain / Heart
审美 Agent: ✨ Sparkles / Eye
合规 Agent: ✅ Shield / CheckCircle
沟通 Agent: 💬 MessageCircle / Users
博弈 Agent: ⚖️ Scale / TrendingUp
成交 Agent: 🤝 Handshake / CheckSquare
```

---

## 插画风格

### 品牌吉祥物：黑松鼠

**设计要点：**
- 手绘黑白线稿风格（参考 happycapy.ai）
- 穿着医美白大褂
- 手持放大镜（象征专业审查）
- 表情温暖、亲和
- 可以有多个姿态：思考、分析、讲解、庆祝

**使用场景：**
- Hero Section 主视觉
- 空状态插画
- 加载动画
- 404 页面
- 成功/失败提示

### 装饰元素

**自然元素：**
- 松树枝叶（呼应"The Growth Matrix"）
- 云朵（轻盈、自由）
- 星星（希望、变美）

**医美元素：**
- 简化的面部轮廓线
- 放大镜
- 检查清单
- 评分星星

---

## 动画效果

### 页面过渡

```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 上滑进入 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Agent 工作动画

```css
/* Agent 思考动画 */
@keyframes thinking {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Agent 协作动画 */
@keyframes collaborate {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
```

### 加载动画

```css
/* 脉冲加载 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 旋转加载 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 响应式设计

### 断点

```css
--breakpoint-sm: 640px;   /* 手机 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 笔记本 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏 */
```

### 布局规则

**移动端（< 768px）：**
- 单列布局
- 全宽卡片
- 底部导航
- 侧边栏折叠

**平板端（768px - 1024px）：**
- 两列布局
- 侧边栏可见
- 顶部导航

**桌面端（> 1024px）：**
- 三列布局
- 固定侧边栏
- 顶部导航 + 面包屑

---

## 文案风格

### 标题风格

**Hero Section：**
```
从心到脸，确定性变美
```

**特点：**
- 简洁有力（6-8 字）
- 使用衬线体
- 强调核心价值

### 副标题风格

```
六大 AI Agent 为你把关
消除医美决策焦虑
```

**特点：**
- 解释性（10-15 字）
- 使用无衬线体
- 说明如何实现

### CTA 文案

```
✅ 好的 CTA：
- "让我的 AI 分身开始评估"
- "查看我的确定性变美报告"
- "匹配最适合我的医生"

❌ 避免的 CTA：
- "点击这里"
- "立即注册"
- "了解更多"
```

### 说明文案

**特点：**
- 通俗易懂
- 避免医学术语
- 使用类比和比喻
- 温暖、亲和的语气

**示例：**
```
❌ "通过面部三维重建技术进行骨骼分析"
✅ "就像给你的脸拍一张 3D 照片，看看哪里可以更美"
```

---

## 设计检查清单

### 视觉一致性
- [ ] 所有颜色来自设计系统
- [ ] 字体大小符合层级规范
- [ ] 间距使用 4px 倍数
- [ ] 圆角统一使用预设值
- [ ] 阴影效果一致

### 可访问性
- [ ] 文字对比度 ≥ 4.5:1
- [ ] 可点击元素 ≥ 44x44px
- [ ] 表单有清晰的标签
- [ ] 错误提示明确
- [ ] 支持键盘导航

### 响应式
- [ ] 移动端可用
- [ ] 平板端优化
- [ ] 桌面端完整体验
- [ ] 触摸友好
- [ ] 加载速度快

### 品牌一致性
- [ ] 使用品牌色
- [ ] 插画风格统一
- [ ] 文案语气一致
- [ ] 吉祥物正确使用
- [ ] Logo 规范使用

---

**设计负责人：** 陈萱宜（Rebecca）
**设计参考：** happycapy.ai
**创建时间：** 2026-02-12
**最后更新：** 2026-02-12
