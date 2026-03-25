# IP Architect Hub - 知识库结构设计

> **目的**: 将自媒体运营知识转化为结构化数据，供 AI 模块调用
>
> **创建时间**: 2026-03-26
> **状态**: 知识库组织完成

---

## 📚 知识库概述

### 知识来源
1. **IP 调研框架** - 48题结构化问卷
2. **IP 规划方法论** - 实战案例（李川南）
3. **内容创作规范** - 待补充
4. **改写标准** - 待补充

### 使用场景
- IP 调研模块：引导用户完成 48 题问卷
- 规划生成模块：基于调研结果生成运营规划
- AI 改写模块：根据品牌调性改写内容
- 内容推荐模块：匹配合适的热门内容

---

## 🎯 模块一：IP 调研框架

### 数据结构设计

```typescript
interface IPResearchQuestion {
  id: string;                    // 问题ID: M1-01 (模块1-问题1)
  module: number;                // 模块编号: 1-6
  moduleTitle: string;           // 模块标题
  question: string;              // 问题内容
  type: 'text' | 'choice' | 'multi_choice' | 'scale';
  options?: string[];            // 选择题选项
  required: boolean;             // 是否必填
  weight?: number;               // 评分权重
  category: string;              // 分类: background/audience/uniqueness/value/content/outputs
}

interface IPResearchResponse {
  ipProjectId: string;
  responses: {
    questionId: string;
    answer: string | string[] | number;
    timestamp: Date;
  }[];
  aiAnalysis?: {
    persona: string;             // AI 生成的人物画像
    positioning: string;         // IP 定位
    audience: string;            // 目标受众
    uniqueness: string;          // 独特价值
    contentPillars: string[];    // 内容支柱
    risks: string[];             // 风险提示
  };
}
```

### 问题清单结构

#### 模块 1：IP 背景洞察 (Who Are You?)
```json
{
  "moduleId": 1,
  "moduleTitle": "IP 背景洞察",
  "questions": [
    {
      "id": "M1-01",
      "question": "您的姓名/昵称是？",
      "type": "text",
      "required": true
    },
    {
      "id": "M1-02",
      "question": "您的职业背景是？",
      "type": "choice",
      "options": ["行业专家", "创业者", "职场达人", "生活达人", "其他"],
      "required": true
    },
    // ... 共 8 题
  ],
  "output": "基础身份信息"
}
```

#### 模块 2：受众与市场洞察 (Who Do You Serve?)
```json
{
  "moduleId": 2,
  "moduleTitle": "受众与市场洞察",
  "questions": [
    {
      "id": "M2-01",
      "question": "您的目标受众年龄段是？",
      "type": "choice",
      "options": ["18-25岁", "25-35岁", "35-45岁", "45岁以上"],
      "required": true
    },
    // ... 共 9 题
  ],
  "output": "受众画像 + 市场定位"
}
```

#### 模块 3：IP 独特性 (Why You?)
```json
{
  "moduleId": 3,
  "moduleTitle": "IP 独特性",
  "questions": [
    {
      "id": "M3-01",
      "question": "您与同领域创作者的最大区别是什么？",
      "type": "text",
      "required": true
    },
    // ... 共 7 题
  ],
  "output": "差异化优势"
}
```

#### 模块 4：核心价值交付 (What Can You Deliver?)
```json
{
  "moduleId": 4,
  "moduleTitle": "核心价值交付",
  "questions": [
    {
      "id": "M4-01",
      "question": "您能带给受众的核心价值是什么？",
      "type": "multi_choice",
      "options": ["知识增量", "情感共鸣", "娱乐放松", "生活灵感", "实用技巧"],
      "required": true
    },
    // ... 共 8 题
  ],
  "output": "价值主张体系"
}
```

#### 模块 5：内容方向构建 (What Will You Speak?)
```json
{
  "moduleId": 5,
  "moduleTitle": "内容方向构建",
  "questions": [
    {
      "id": "M5-01",
      "question": "您最擅长的内容形式是？",
      "type": "multi_choice",
      "options": ["干货教程", "经验分享", "观点评论", "生活记录", "剧情内容"],
      "required": true
    },
    // ... 共 9 题
  ],
  "output": "内容支柱矩阵"
}
```

#### 模块 6：输出交付物 (Outputs)
```json
{
  "moduleId": 6,
  "moduleTitle": "输出交付物",
  "deliverables": [
    "IP 人物画像",
    "目标受众画像",
    "IP 核心定位",
    "内容支柱矩阵",
    "品牌调性指南",
    "风险评估报告"
  ]
}
```

---

## 📋 模块二：IP 规划生成框架

### 数据结构设计

```typescript
interface IPPlan {
  ipProjectId: string;
  basedOnResearchId: string;

  // 核心定位
  corePositioning: {
    oneLineStatement: string;    // 一句话定位
    persona: string;              // 人设描述
    targetAudience: {
      demographics: string;       // 人口统计特征
      psychographics: string;     // 心理特征
      painPoints: string[];       // 痛点
      desires: string[];          // 渴望
    };
  };

  // 内容支柱
  contentPillars: {
    main: ContentPillar;          // 主支柱 (1个)
    sub: ContentPillar[];         // 副支柱 (2个)
  };

  // 内容风格
  contentStyle: {
    tone: string;                 // 语气风格
    format: string[];             // 内容形式
    visualStyle: string;          // 视觉风格
    topics: string[];             // 常见话题
  };

  // 标题模板库
  titleTemplates: {
    pillar: string;               // 所属支柱
    templates: string[];          // 标题模板
  }[];

  // 变现路径
  monetization: {
    current: string[];            // 当前变现方式
    future: string[];             // 未来规划
  };

  // 运营目标
  goals: {
    shortTerm: string;            // 短期目标 (3个月)
    mediumTerm: string;           // 中期目标 (6个月)
    longTerm: string;             // 长期目标 (1年)
  };

  // 内容日历模板
  contentCalendar: {
    frequency: number;            // 发布频率 (每周X篇)
    bestTimes: string[];          // 最佳发布时间
    mixRatio: {                   // 内容配比
      main: number;               // 主支柱占比
      sub1: number;               // 副支柱1占比
      sub2: number;               // 副支柱2占比
    };
  };
}

interface ContentPillar {
  name: string;                   // 支柱名称
  description: string;            // 描述
  contentAngles: string[];        // 内容角度
  exampleTitles: string[];        // 示例标题
}
```

### AI 生成提示词模板

#### 模板 1：生成核心定位
```markdown
你是一位专业的 IP 孵化顾问。基于以下调研结果，生成 IP 核心定位：

## 调研数据
{research_data}

## 要求
1. 一句话定位（20字以内）
2. 人设描述（100字）
3. 目标受众画像（包括人口统计、心理特征、痛点、渴望）
4. 确保定位清晰、差异化、可执行

## 输出格式
JSON 格式，包含上述所有字段
```

#### 模板 2：设计内容支柱
```markdown
基于 IP 核心定位，设计内容支柱体系：

## IP 定位
{positioning}

## 要求
1. 1 个主支柱 - 代表 IP 核心价值
2. 2 个副支柱 - 支撑主支柱，丰富内容
3. 每个支柱包含：
   - 名称（简洁有力）
   - 描述（50字）
   - 5个内容角度
   - 5个示例标题

## 参考案例
李川南的内容支柱：
- 主：女性成长认知升级
- 副1：情感关系咨询
- 副2：生活方式分享

## 输出格式
JSON 格式
```

#### 模板 3：生成标题库
```markdown
为 IP 生成爆款标题库：

## 内容支柱
{content_pillars}

## 目标受众
{target_audience}

## 要求
1. 每个支柱生成 10 个标题
2. 标题类型包括：
   - 痛点型
   - 数字型
   - 反常识型
   - 情绪型
   - 故事型
3. 标题要符合平台调性（小红书/抖音）
4. 标题要具有点击吸引力

## 输出格式
JSON 数组，每个标题包含类型和内容
```

---

## 🎨 模块三：内容改写规范

### 数据结构设计

```typescript
interface RewriteRule {
  platform: 'xiaohongshu' | 'douyin' | 'weibo' | 'wechat';
  brandTone: string;             // 品牌调性
  requirements: {
    length: { min: number; max: number };
    style: string[];             // 风格要求
    keywords: string[];          // 关键词要求
    avoid: string[];             // 禁止词汇
    formatting: string[];        // 格式要求
  };
  examples: {
    original: string;
    rewritten: string;
    reason: string;
  }[];
}

interface RewriteRequest {
  originalContent: Content;
  targetPlatform: string;
  ipProjectId: string;
  preserveElements: string[];    // 保留元素
  enhanceAspects: string[];      // 增强方面
}

interface RewriteResult {
  rewrittenContent: string;
  changes: string[];             // 修改说明
  toneMatch: number;             // 调性匹配度 (0-1)
  platformScore: number;         // 平台适配度 (0-1)
  suggestions: string[];         // 优化建议
}
```

### 改写规则库（待补充）

#### 小红书平台
```json
{
  "platform": "xiaohongshu",
  "characteristics": [
    "种草属性强",
    "视觉优先",
    "真诚分享感",
    "emoji 使用",
    "标签重要"
  ],
  "bestPractices": [
    "开头有吸引钩子",
    "中间有干货价值",
    "结尾有互动引导",
    "配图精心设计",
    "话题标签精准"
  ],
  "titleStyle": "emoji + 关键词 + 数字/情绪词",
  "contentStructure": "钩子 → 价值 → 体验 → 行动号召"
}
```

---

## 📊 模块四：内容推荐算法

### 匹配逻辑设计

```typescript
interface ContentMatch {
  collectedContent: Content;      // 采集的热门内容
  ipProject: IPProject;           // IP 项目

  matchScore: {
    overall: number;              // 综合匹配度 (0-100)
    topic: number;                // 话题相关性
    audience: number;             // 受众匹配度
    format: number;               // 形式适配度
    tone: number;                 // 调性契合度
  };

  recommendation: {
    suitable: boolean;            // 是否推荐
    reason: string;               // 推荐理由
    rewriteSuggestions: string[]; // 改写建议
    riskLevel: 'low' | 'medium' | 'high';
  };
}

interface MatchingAlgorithm {
  // 计算话题相关性
  calculateTopicRelevance(
    contentTopics: string[],
    ipPillars: ContentPillar[]
  ): number;

  // 计算受众匹配度
  calculateAudienceMatch(
    contentAudience: string,
    ipTargetAudience: string
  ): number;

  // 计算调性契合度
  calculateToneMatch(
    contentTone: string,
    brandTone: string
  ): number;
}
```

### 推荐规则

```typescript
const RECOMMENDATION_RULES = {
  // 规则 1: 话题匹配权重最高
  topicWeight: 0.4,

  // 规则 2: 受众匹配次之
  audienceWeight: 0.3,

  // 规则 3: 调性契合
  toneWeight: 0.2,

  // 规则 4: 形式适配
  formatWeight: 0.1,

  // 阈值设置
  thresholds: {
    high: 80,      // 高度推荐
    medium: 60,    // 中度推荐
    low: 40        // 低度推荐
  },

  // 风险内容识别
  riskSignals: [
    "敏感话题",
    "争议性观点",
    "竞品内容",
    "低质内容"
  ]
};
```

---

## 🗄️ 数据库设计更新

### 新增表结构

#### knowledge_questions（知识库问题表）
```sql
CREATE TABLE knowledge_questions (
  id VARCHAR(20) PRIMARY KEY,          -- 问题ID: M1-01
  module INT NOT NULL,                  -- 模块编号
  module_title VARCHAR(100),            -- 模块标题
  question TEXT NOT NULL,               -- 问题内容
  type VARCHAR(20) NOT NULL,            -- 问题类型
  options JSONB,                        -- 选项（选择题）
  required BOOLEAN DEFAULT true,        -- 是否必填
  weight INT DEFAULT 1,                 -- 权重
  category VARCHAR(50),                 -- 分类
  order_in_module INT,                  -- 模块内顺序
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_knowledge_questions_module ON knowledge_questions(module);
CREATE INDEX idx_knowledge_questions_category ON knowledge_questions(category);
```

#### knowledge_title_templates（标题模板库）
```sql
CREATE TABLE knowledge_title_templates (
  id SERIAL PRIMARY KEY,
  pillar VARCHAR(100) NOT NULL,         -- 内容支柱
  template TEXT NOT NULL,               -- 标题模板
  type VARCHAR(50),                     -- 标题类型
  platform VARCHAR(50),                 -- 适用平台
  effectiveness_score FLOAT,            -- 效果评分
  usage_count INT DEFAULT 0,            -- 使用次数
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_title_templates_pillar ON knowledge_title_templates(pillar);
CREATE INDEX idx_title_templates_type ON knowledge_title_templates(type);
```

#### knowledge_rewrite_rules（改写规则表）
```sql
CREATE TABLE knowledge_rewrite_rules (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,        -- 平台
  brand_tone TEXT,                      -- 品牌调性
  requirements JSONB NOT NULL,          -- 改写要求
  best_practices TEXT[],                -- 最佳实践
  content_structure TEXT,               -- 内容结构
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform, brand_tone)
);
```

#### knowledge_content_pillars（内容支柱库）
```sql
CREATE TABLE knowledge_content_pillars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,           -- 支柱名称
  description TEXT,                     -- 描述
  category VARCHAR(50),                 -- 分类（主/副）
  content_angles TEXT[],                -- 内容角度
  example_titles TEXT[],                -- 示例标题
  applicable_domains VARCHAR(100)[],    -- 适用领域
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 开发实现

### API 端点设计

#### 知识库管理 API
```typescript
// 获取调研问卷
GET /api/knowledge/research-questions
GET /api/knowledge/research-questions/:moduleId

// 获取标题模板
GET /api/knowledge/title-templates?pillar={pillar}

// 获取改写规则
GET /api/knowledge/rewrite-rules?platform={platform}

// 获取内容支柱库
GET /api/knowledge/content-pillars?domain={domain}

// AI 生成规划
POST /api/knowledge/generate-plan
Body: {
  researchResponseId: string,
  customRequirements?: string
}
```

### 核心服务模块

#### KnowledgeService
```typescript
class KnowledgeService {
  // 获取调研问卷
  async getResearchQuestions(moduleId?: number) {
    // 从数据库获取问题
    // 按模块组织
  }

  // 保存调研答案
  async saveResearchResponse(
    ipProjectId: string,
    responses: ResearchResponse[]
  ) {
    // 保存到数据库
    // 触发 AI 分析
  }

  // 生成 IP 规划
  async generateIPPlan(researchResponseId: string) {
    // 1. 获取调研数据
    // 2. 调用 GLM-5 API
    // 3. 生成完整规划
    // 4. 保存到数据库
  }

  // 匹配推荐内容
  async matchContent(
    contentId: string,
    ipProjectId: string
  ): Promise<ContentMatch> {
    // 计算匹配度
    // 返回推荐结果
  }

  // 获取改写建议
  async getRewriteSuggestions(
    contentId: string,
    ipProjectId: string,
    targetPlatform: string
  ): Promise<RewriteSuggestion[]> {
    // 获取改写规则
    // 生成改写建议
  }
}
```

---

## 📁 文件组织

### 知识库文件结构
```
ip-architect-hub/
├── zhishiku/                          # 原始知识库文件
│   ├── IP调研问答_提取.txt
│   └── 李川南IP规划_提取.txt
│
├── src/
│   ├── lib/
│   │   ├── knowledge/                 # 知识库服务模块
│   │   │   ├── research-questions.ts  # 调研问题定义
│   │   │   ├── title-templates.ts     # 标题模板库
│   │   │   ├── rewrite-rules.ts       # 改写规则
│   │   │   ├── content-pillars.ts     # 内容支柱库
│   │   │   └── knowledge-service.ts   # 知识库服务
│   │   │
│   │   └── ai/                        # AI 服务
│   │       ├── prompts/               # AI 提示词模板
│   │       │   ├── generate-positioning.ts
│   │       │   ├── generate-pillars.ts
│   │       │   ├── generate-titles.ts
│   │       │   └── generate-plan.ts
│   │       │
│   │       └── ai-service.ts          # AI 服务封装
│   │
│   └── types/
│       └── knowledge.ts               # 知识库类型定义
│
└── docs/
    ├── knowledge-base-structure.md    # 本文档
    └── knowledge-base-api.md          # 知识库 API 文档
```

---

## 🚀 下一步行动

### 立即执行
1. ✅ 知识库结构设计完成
2. ⏳ 创建数据库迁移脚本
3. ⏳ 实现知识库服务模块
4. ⏳ 准备 AI 提示词模板

### 待补充内容
1. **内容改写规范** - 各平台改写标准
2. **内容筛选标准** - 优质内容评分体系
3. **标题模板扩展** - 更多领域的标题库
4. **竞品分析方法** - 竞品监控维度

### 需要用户提供
1. 品牌调性保持的具体案例
2. 不同平台的改写示例
3. 内容评分标准和权重
4. 爬虫采集的关键词配置

---

## 📊 知识库使用流程

```
用户创建 IP 项目
    ↓
执行 IP 调研问卷（48 题）
    ↓
AI 分析调研结果
    ↓
生成 IP 运营规划
    ↓
系统采集热门内容
    ↓
根据知识库匹配推荐
    ↓
AI 辅助改写
    ↓
多平台发布
    ↓
数据反馈优化
```

---

**创建时间**: 2026-03-26
**最后更新**: 2026-03-26
**状态**: ✅ 知识库结构设计完成
