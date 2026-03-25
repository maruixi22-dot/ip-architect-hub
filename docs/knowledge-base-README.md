# 知识库系统 - 开发文档

> **IP Architect Hub 知识库系统**
> 将自媒体运营知识转化为结构化数据，驱动 AI 功能

---

## 📚 知识库组织成果

### ✅ 已完成的工作

#### 1. 知识库结构设计
**文档**: `docs/knowledge-base-structure.md`

包含以下模块：
- IP 调研框架数据结构
- IP 规划生成框架
- 内容改写规范
- 内容推荐算法
- 数据库表设计
- API 端点设计
- 文件组织结构

#### 2. TypeScript 类型定义
**文件**: `src/types/knowledge.ts`

定义的完整类型系统：
- `IPResearchQuestion` - 调研问题
- `IPResearchResponse` - 调研答案
- `IPPlan` - IP 规划
- `ContentPillar` - 内容支柱
- `TitleTemplate` - 标题模板
- `RewriteRule` - 改写规则
- `ContentMatchScore` - 内容匹配度
- 以及其他 20+ 类型定义

#### 3. 调研问卷数据
**文件**: `src/lib/knowledge/research-questions.ts`

完整的 48 题结构化问卷：
- ✅ 模块 1：IP 背景洞察（8题）
- ✅ 模块 2：受众与市场洞察（9题）
- ✅ 模块 3：IP 独特性（7题）
- ✅ 模块 4：核心价值交付（8题）
- ✅ 模块 5：内容方向构建（9题）
- ✅ 模块 6：输出交付物（定义）

工具函数：
- `getQuestionsByModule()` - 按模块获取问题
- `getQuestionsByCategory()` - 按分类获取问题
- `getQuestion()` - 获取单个问题
- `calculateProgress()` - 计算完成度
- `getRequiredQuestionsCount()` - 获取必答题数

#### 4. AI 提示词模板
**文件**: `src/lib/ai/prompts/generate-positioning.ts`

三个核心提示词模板：
- ✅ `generatePositioningPrompt()` - 生成 IP 核心定位
- ✅ `generateContentPillarsPrompt()` - 设计内容支柱
- ✅ `generateTitleTemplatesPrompt()` - 创建标题库

**文件**: `src/lib/ai/prompts/generate-plan.ts`

- ✅ `generateCompletePlanPrompt()` - 生成完整 IP 运营规划
- ✅ `generateFollowUpQuestionsPrompt()` - 生成补充问题

---

## 🎯 核心功能模块

### 模块 1：IP 调研系统
```
用户创建 IP 项目
    ↓
执行 48 题问卷（分 6 个模块）
    ↓
实时保存答案到数据库
    ↓
AI 分析调研结果
    ↓
生成人物画像和初步定位
```

### 模块 2：规划生成系统
```
基于调研结果
    ↓
调用 GLM-5 API
    ↓
生成完整 IP 运营规划
    ↓
包含：定位 + 内容支柱 + 标题库 + 变现路径
    ↓
用户可手动调整
```

### 模块 3：内容推荐系统
```
系统采集热门内容
    ↓
根据 IP 规划匹配
    ↓
计算匹配度（话题/受众/调性/形式）
    ↓
生成推荐列表和改写建议
```

### 模块 4：AI 改写系统
```
用户选择要改写的内容
    ↓
系统获取 IP 品牌调性
    ↓
调用 AI 改写
    ↓
输出符合调性的新内容
```

---

## 📊 数据流向

### 1. 调研阶段
```
用户输入 → 前端表单 → API → PostgreSQL (research_responses)
                                 ↓
                            触发 AI 分析
                                 ↓
                            更新 AI 分析结果
```

### 2. 规划生成
```
research_responses → AI Service → GLM-5 API
                                        ↓
                                  IP Plan (JSON)
                                        ↓
                                  PostgreSQL (ip_plans)
                                        ↓
                                  前端展示 + 编辑
```

### 3. 内容推荐
```
采集内容 → MongoDB → 匹配算法 → 计算匹配度
              ↓                          ↓
         Redis 缓存                推荐列表
              ↓                          ↓
         定期更新                  用户查看
```

---

## 🗄️ 数据库设计

### 新增表结构

#### knowledge_questions
```sql
-- 存储调研问卷的 48 个问题
-- 支持按模块、分类查询
```

#### knowledge_title_templates
```sql
-- 存储标题模板库
-- 支持按支柱、类型、平台查询
-- 记录效果评分和使用次数
```

#### knowledge_rewrite_rules
```sql
-- 存储各平台改写规则
-- 支持按平台、品牌调性查询
```

#### knowledge_content_pillars
```sql
-- 存储内容支柱库
-- 支持按领域、分类查询
```

### 集成到现有数据库

与现有表的关联：
- `research_responses` ← 使用 `knowledge_questions`
- `ip_plans` ← 使用 AI 生成的规划数据
- `contents` ← 关联推荐和改写功能
- `rewrites` ← 使用 `knowledge_rewrite_rules`

---

## 🔧 开发实现

### 待实现的服务类

#### KnowledgeService
```typescript
class KnowledgeService {
  // 获取调研问卷
  getResearchQuestions(moduleId?: number)

  // 保存调研答案
  saveResearchResponse(ipProjectId, responses)

  // 生成 IP 规划
  generateIPPlan(researchResponseId)

  // 匹配推荐内容
  matchContent(contentId, ipProjectId)

  // 获取改写建议
  getRewriteSuggestions(contentId, ipProjectId, platform)
}
```

#### AIService
```typescript
class AIService {
  // 调用 GLM-5 API
  async callGLM5(prompt: string): Promise<string>

  // 生成 IP 定位
  generatePositioning(researchData)

  // 生成内容支柱
  generateContentPillars(positioning)

  // 生成标题库
  generateTitleTemplates(pillars, audience)

  // 改写内容
  rewriteContent(content, brandTone, platform)
}
```

### API 端点

#### 调研相关
```
GET    /api/knowledge/research-questions
GET    /api/knowledge/research-questions/:moduleId
POST   /api/research/responses
GET    /api/research/responses/:id
```

#### 规划生成
```
POST   /api/knowledge/generate-plan
GET    /api/plans/:id
PUT    /api/plans/:id
```

#### 知识库查询
```
GET    /api/knowledge/title-templates
GET    /api/knowledge/rewrite-rules
GET    /api/knowledge/content-pillars
```

---

## 📁 文件结构

```
ip-architect-hub/
├── src/
│   ├── types/
│   │   └── knowledge.ts              # ✅ 知识库类型定义
│   │
│   ├── lib/
│   │   ├── knowledge/
│   │   │   ├── research-questions.ts # ✅ 调研问题数据
│   │   │   ├── title-templates.ts    # ⏳ 待创建
│   │   │   ├── rewrite-rules.ts      # ⏳ 待创建
│   │   │   ├── content-pillars.ts    # ⏳ 待创建
│   │   │   └── knowledge-service.ts  # ⏳ 待创建
│   │   │
│   │   └── ai/
│   │       ├── prompts/
│   │       │   ├── generate-positioning.ts  # ✅ 定位生成提示词
│   │       │   └── generate-plan.ts         # ✅ 规划生成提示词
│   │       │
│   │       └── ai-service.ts          # ⏳ 待创建
│   │
│   └── app/
│       └── api/
│           ├── knowledge/            # ⏳ 待创建
│           │   ├── research-questions/route.ts
│           │   ├── generate-plan/route.ts
│           │   └── title-templates/route.ts
│           │
│           └── research/              # ⏳ 待创建
│               └── responses/route.ts
│
├── docs/
│   ├── knowledge-base-structure.md   # ✅ 知识库结构文档
│   └── knowledge-base-README.md      # ✅ 本文档
│
└── zhishiku/                         # 原始知识库文件
    ├── IP调研问答_提取.txt
    └── 李川南IP规划_提取.txt
```

---

## 🚀 下一步开发计划

### 立即可以开始的任务

1. **初始化 Next.js 项目**
   ```bash
   cd ~/Desktop/Claude\ Code/ip-architect-hub
   npx create-next-app@latest . --typescript --tailwind --app
   ```

2. **安装依赖**
   - shadcn/ui
   - Prisma（数据库 ORM）
   - GLM-5 SDK
   - Redis 客户端

3. **配置数据库**
   - 设置 PostgreSQL
   - 运行迁移脚本
   - 创建知识库相关表

4. **实现知识库服务**
   - KnowledgeService 类
   - AIService 类
   - API 路由

5. **开发前端界面**
   - 调研问卷页面
   - 规划生成页面
   - 结果展示页面

### 待补充的知识内容

1. **内容改写规范**
   - 小红书改写规则
   - 抖音改写规则
   - 微信改写规则
   - 品牌调性保持案例

2. **内容筛选标准**
   - 优质内容评分体系
   - 匹配算法权重配置
   - 风险内容识别规则

3. **标题模板扩展**
   - 更多领域的标题库
   - 不同行业的标题模板

4. **爬虫策略**
   - 关键词配置
   - 采集频率设置
   - 反爬虫策略

---

## 💡 使用示例

### 前端调用示例

```typescript
// 1. 获取调研问题
const questions = await fetch('/api/knowledge/research-questions?module=1')
  .then(r => r.json())

// 2. 提交调研答案
const response = await fetch('/api/research/responses', {
  method: 'POST',
  body: JSON.stringify({
    ipProjectId: 'project-123',
    responses: [
      { questionId: 'M1-01', answer: '张三' },
      { questionId: 'M1-02', answer: '行业专家' }
    ]
  })
})

// 3. 生成 IP 规划
const plan = await fetch('/api/knowledge/generate-plan', {
  method: 'POST',
  body: JSON.stringify({
    researchResponseId: 'research-456'
  })
}).then(r => r.json())

// 4. 获取标题模板
const templates = await fetch('/api/knowledge/title-templates?pillar=女性成长')
  .then(r => r.json())
```

---

## 📊 知识库统计

- **调研问题**: 48 题（6 个模块）
- **数据类型**: 15+ TypeScript 类型
- **提示词模板**: 5 个
- **数据库表**: 4 个新增
- **API 端点**: 10+ 个

---

## 🎓 设计原则

1. **结构化优先**: 将非结构化知识转化为结构化数据
2. **AI 驱动**: 所有生成内容都基于 AI 模板
3. **可扩展性**: 易于添加新的知识领域
4. **用户可控**: AI 生成内容可由用户调整
5. **数据闭环**: 使用数据持续优化知识库

---

**创建时间**: 2026-03-26
**状态**: ✅ 知识库组织完成
**下一步**: 初始化 Next.js 项目
