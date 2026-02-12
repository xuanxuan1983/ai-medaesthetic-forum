# The Growth Matrix Development Guide

> 使用 Claude Code + SecondMe Skills 快速开发 A2A 医美信任增长社区

---

## 开发环境准备

### 1. 安装 Claude Code

如果还没有安装 Claude Code，运行：

```bash
curl -fsSL https://hackathon.second.me/api/setup/launch | bash
```

这会自动安装：
- Node.js
- Claude Code
- SecondMe Skills

### 2. 安装 SecondMe Skills

在 Claude Code 中运行：

```
/plugin marketplace add mindverse/Second-Me-Skills
/plugin install secondme-skills@mindverse-secondme-skills
```

安装完成后，你会获得两个命令：
- `/secondme` - SecondMe 开发助手
- `/secondme-oauth` - OAuth 集成助手

### 3. 注册 SecondMe 开发者账号

1. 访问：https://develop.second.me/
2. 注册开发者账号
3. 创建应用，获取：
   - Client ID
   - Client Secret

⚠️ 保存好这两个密钥，后面会用到

---

## 快速开始

### Step 1：创建项目

在 Claude Code 中输入：

```
我想创建一个 Next.js 项目，名称是"The Growth Matrix"（the-growth-matrix）
项目需要集成 SecondMe OAuth 登录
请使用 /secondme 技能帮我搭建
```

Claude 会：
1. 创建 Next.js 14 项目（App Router）
2. 安装必要依赖
3. 配置 Tailwind CSS
4. 设置项目结构

### Step 2：集成 SecondMe OAuth

继续在 Claude Code 中输入：

```
请帮我集成 SecondMe OAuth 登录
我的 Client ID 是：[你的 Client ID]
我的 Client Secret 是：[你的 Client Secret]
```

Claude 会：
1. 创建 OAuth 配置文件
2. 实现登录/登出逻辑
3. 创建回调处理
4. 添加用户信息获取

### Step 3：应用设计系统

```
请根据 /Users/xuan/Projects/the-growth-matrix/DESIGN.md 中的设计系统
配置 Tailwind CSS 和全局样式
```

Claude 会：
1. 配置 Tailwind 主题
2. 添加自定义颜色
3. 设置字体
4. 创建全局样式

### Step 4：创建页面

```
请根据 /Users/xuan/Projects/the-growth-matrix/COPY.md 中的文案
创建以下页面：
1. 首页（Hero Section + 六大 Agent 介绍）
2. 创建 AI 分身页面
3. 报告页面
4. 社区页面
```

Claude 会逐个创建页面，包括：
- 页面布局
- 组件实现
- 文案填充
- 样式应用

---

## 项目结构

```
the-growth-matrix/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── callback/
│   ├── (main)/
│   │   ├── page.tsx          # 首页
│   │   ├── create/
│   │   │   └── page.tsx      # 创建 AI 分身
│   │   ├── report/
│   │   │   └── page.tsx      # 报告页面
│   │   └── community/
│   │       └── page.tsx      # 社区页面
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── callback/
│   │   │   └── logout/
│   │   └── secondme/
│   │       ├── profile/
│   │       └── chat/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui 组件
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── AgentMatrix.tsx
│   │   └── Features.tsx
│   ├── agent/
│   │   ├── AgentCard.tsx
│   │   ├── AgentProgress.tsx
│   │   └── AgentChat.tsx
│   └── report/
│       ├── ReportCard.tsx
│       └── ReportDetail.tsx
├── lib/
│   ├── secondme.ts           # SecondMe API 封装
│   ├── utils.ts
│   └── constants.ts
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── mascot.svg        # 黑松鼠吉祥物
│   │   └── agents/           # Agent 图标
│   └── fonts/
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 核心功能实现

### 1. SecondMe OAuth 登录

**配置文件：** `.env.local`

```env
SECONDME_CLIENT_ID=your_client_id
SECONDME_CLIENT_SECRET=your_client_secret
SECONDME_REDIRECT_URI=http://localhost:3000/api/auth/callback
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

**登录流程：**

```typescript
// app/api/auth/login/route.ts
export async function GET() {
  const authUrl = `https://auth.second.me/oauth/authorize?client_id=${process.env.SECONDME_CLIENT_ID}&redirect_uri=${process.env.SECONDME_REDIRECT_URI}&response_type=code&scope=profile`;

  return NextResponse.redirect(authUrl);
}
```

**回调处理：**

```typescript
// app/api/auth/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // 交换 access_token
  const tokenResponse = await fetch('https://auth.second.me/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SECONDME_CLIENT_ID,
      client_secret: process.env.SECONDME_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.SECONDME_REDIRECT_URI,
    }),
  });

  const { access_token } = await tokenResponse.json();

  // 获取用户信息
  const userResponse = await fetch('https://api.second.me/v1/user/profile', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const user = await userResponse.json();

  // 保存到 session
  // ...

  return NextResponse.redirect('/');
}
```

### 2. 调用 SecondMe API

**封装 API 客户端：**

```typescript
// lib/secondme.ts
export class SecondMeClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserProfile() {
    const response = await fetch('https://api.second.me/v1/user/profile', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    return response.json();
  }

  async chatWithAgent(agentId: string, message: string) {
    const response = await fetch('https://api.second.me/v1/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        message,
      }),
    });
    return response.json();
  }

  async createAgent(config: AgentConfig) {
    const response = await fetch('https://api.second.me/v1/agents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    return response.json();
  }
}
```

### 3. 六大 Agent 实现

**Agent 配置：**

```typescript
// lib/agents.ts
export const AGENTS = {
  psychology: {
    id: 'psychology-agent',
    name: '心理 Agent',
    color: '#B8A8D6',
    icon: 'Brain',
    prompt: `你是一位专业的心理评估师...`,
  },
  aesthetic: {
    id: 'aesthetic-agent',
    name: '审美 Agent',
    color: '#E8B8C8',
    icon: 'Sparkles',
    prompt: `你是一位专业的审美顾问...`,
  },
  compliance: {
    id: 'compliance-agent',
    name: '合规 Agent',
    color: '#A8C5A0',
    icon: 'Shield',
    prompt: `你是一位专业的合规审查员...`,
  },
  communication: {
    id: 'communication-agent',
    name: '沟通 Agent',
    color: '#8AAED6',
    icon: 'MessageCircle',
    prompt: `你是一位专业的医学翻译...`,
  },
  negotiation: {
    id: 'negotiation-agent',
    name: '博弈 Agent',
    color: '#E8B86D',
    icon: 'Scale',
    prompt: `你是一位专业的价格谈判专家...`,
  },
  transaction: {
    id: 'transaction-agent',
    name: '成交 Agent',
    color: '#C9A88A',
    icon: 'Handshake',
    prompt: `你是一位专业的决策顾问...`,
  },
};
```

**Agent 协作逻辑：**

```typescript
// lib/agent-orchestrator.ts
export class AgentOrchestrator {
  private client: SecondMeClient;

  async runAssessment(userProfile: UserProfile) {
    // 并行运行六大 Agent
    const results = await Promise.all([
      this.runPsychologyAgent(userProfile),
      this.runAestheticAgent(userProfile),
      this.runComplianceAgent(userProfile),
      this.runCommunicationAgent(userProfile),
      this.runNegotiationAgent(userProfile),
      this.runTransactionAgent(userProfile),
    ]);

    // 生成综合报告
    return this.generateReport(results);
  }

  private async runPsychologyAgent(userProfile: UserProfile) {
    const agent = AGENTS.psychology;
    const response = await this.client.chatWithAgent(
      agent.id,
      `请评估以下用户的心理准备度：${JSON.stringify(userProfile)}`
    );
    return {
      agent: 'psychology',
      score: this.extractScore(response),
      analysis: response,
    };
  }

  // ... 其他 Agent 实现

  private generateReport(results: AgentResult[]) {
    return {
      psychology: results[0],
      aesthetic: results[1],
      compliance: results[2],
      communication: results[3],
      negotiation: results[4],
      transaction: results[5],
      overall_score: this.calculateOverallScore(results),
      recommendation: this.generateRecommendation(results),
    };
  }
}
```

### 4. 数据库设计

**使用 Supabase：**

```sql
-- users 表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  secondme_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ai_profiles 表
CREATE TABLE ai_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  age INTEGER,
  gender VARCHAR(50),
  occupation VARCHAR(255),
  beauty_goals TEXT[],
  budget_range INT4RANGE,
  timeline VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- assessments 表
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ai_profile_id UUID REFERENCES ai_profiles(id),
  psychology_score INTEGER,
  aesthetic_analysis JSONB,
  compliance_check JSONB,
  communication_notes TEXT[],
  negotiation_strategy JSONB,
  transaction_recommendation TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- reports 表
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id),
  title VARCHAR(255),
  content JSONB,
  recommendations TEXT[],
  risk_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 开发流程

### Day 1（2月12日）

**上午：**
1. ✅ 创建项目结构
2. ✅ 集成 SecondMe OAuth
3. ✅ 配置设计系统

**下午：**
4. ⏳ 实现首页（Hero Section + Agent 介绍）
5. ⏳ 实现登录/注册流程
6. ⏳ 创建 AI 分身表单

**晚上：**
7. ⏳ 测试 OAuth 流程
8. ⏳ 部署到 Vercel（测试环境）

### Day 2（2月13日）

**上午：**
1. ⏳ 实现六大 Agent 逻辑
2. ⏳ Agent 协作流程
3. ⏳ 报告生成功能

**下午：**
4. ⏳ 报告页面 UI
5. ⏳ 社区页面（简化版）
6. ⏳ 完善交互细节

**晚上：**
7. ⏳ 全流程测试
8. ⏳ 修复 Bug
9. ⏳ 性能优化

### Day 3（2月14日）

**上午：**
1. ⏳ 最后测试
2. ⏳ 准备 Demo 数据
3. ⏳ 录制演示视频

**下午：**
4. ⏳ 部署到生产环境
5. ⏳ 提交项目
6. ⏳ 准备路演材料

---

## 部署指南

### 部署到 Vercel

1. **连接 GitHub：**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

2. **导入到 Vercel：**
   - 访问：https://vercel.com
   - 点击 "Import Project"
   - 选择你的 GitHub 仓库
   - 配置环境变量：
     - `SECONDME_CLIENT_ID`
     - `SECONDME_CLIENT_SECRET`
     - `SECONDME_REDIRECT_URI`（改为生产环境 URL）
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`（改为生产环境 URL）

3. **部署：**
   - 点击 "Deploy"
   - 等待部署完成
   - 获取生产环境 URL

4. **更新 SecondMe 回调地址：**
   - 回到 SecondMe 开发者平台
   - 更新 Redirect URI 为：`https://your-domain.vercel.app/api/auth/callback`

---

## 测试清单

### 功能测试
- [ ] OAuth 登录成功
- [ ] 创建 AI 分身成功
- [ ] 六大 Agent 评估运行
- [ ] 报告生成成功
- [ ] 数据持久化正常

### UI 测试
- [ ] 响应式布局正常
- [ ] 设计系统应用正确
- [ ] 动画流畅
- [ ] 加载状态清晰
- [ ] 错误提示友好

### 性能测试
- [ ] 首屏加载 < 3s
- [ ] 页面切换流畅
- [ ] API 响应 < 1s
- [ ] 图片优化
- [ ] 代码分割

### 兼容性测试
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] 移动端浏览器

---

## 常见问题

### Q: OAuth 回调失败？
A: 检查：
1. Redirect URI 是否正确配置
2. Client ID 和 Secret 是否正确
3. 环境变量是否正确设置

### Q: Agent 响应慢？
A: 优化：
1. 使用并行请求
2. 添加缓存
3. 优化 Prompt 长度

### Q: 部署后样式错乱？
A: 检查：
1. Tailwind CSS 配置
2. 全局样式导入
3. 字体文件路径

---

## 资源链接

- **SecondMe 开发者平台：** https://develop.second.me/
- **SecondMe API 文档：** https://develop-docs.second.me/
- **Claude Code Skills：** https://github.com/mindverse/Second-Me-Skills
- **黑客松管理大厅：** https://hackathon.second.me/
- **Vercel 部署文档：** https://vercel.com/docs
- **Next.js 文档：** https://nextjs.org/docs
- **Tailwind CSS 文档：** https://tailwindcss.com/docs

---

## 下一步

现在你已经有了完整的开发指南，可以开始开发了！

在 Claude Code 中输入：

```
请根据 /Users/xuan/Projects/the-growth-matrix/ 目录下的文档
开始搭建 The Growth Matrix 项目
```

Claude 会按照规划文档、设计系统、文案框架，一步一步帮你完成开发。

祝你黑客松顺利！🚀

---

**开发负责人：** 陈萱宜（Rebecca）
**创建时间：** 2026-02-12
**最后更新：** 2026-02-12
