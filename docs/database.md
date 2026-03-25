# IP Architect Hub - 数据库设计

## 1. 数据库概述

IP Architect Hub 使用**混合数据库架构**：
- **PostgreSQL**：结构化数据（用户、IP 项目、配置）
- **MongoDB**：非结构化数据（采集内容、日志）
- **Redis**：缓存和队列

---

## 2. PostgreSQL 数据库设计

### 2.1 ER 图

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   users     │         │  ip_projects │         │  research   │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │──┐      │ id (PK)     │──┐      │ id (PK)     │
│ email       │  │      │ user_id (FK)│  │      │ project_id  │
│ name        │  │      │ name        │  │      │ answers     │
│ password    │  │      │ category    │  │      │ persona     │
│ role        │  │      │ status      │  │      │ status      │
│ created_at  │  │      │ created_at  │  │      │ created_at  │
└─────────────┘  │      └─────────────┘  │      └─────────────┘
                 │ 1         N         │ 1         N
                 ↓                     ↓
┌─────────────┐  └───────────────────────────┐
│   plans     │                             │
├─────────────┤                             │
│ id (PK)     │←────────────────────────────┘
│ project_id  │
│ content     │
│ status      │
│ created_at  │
└─────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   contents  │         │  rewrites   │         │  publishes  │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │←───────│ id (PK)     │←───────│ id (PK)     │
│ source_url  │  N   1 │ content_id  │  N   1 │ rewrite_id  │
│ platform    │         │ rewritten   │         │ platform    │
│ title       │         │ status      │         │ status      │
│ score       │         │ created_at  │         │ published_at│
│ created_at  │         └─────────────┘         └─────────────┘
└─────────────┘

┌─────────────┐         ┌─────────────┐
│ push_tasks  │         │ analytics   │
├─────────────┤         ├─────────────┤
│ id (PK)     │←────────│ project_id  │
│ project_id  │  1   N  │ date        │
│ content_ids │         │ metrics     │
│ scheduled_at│         │ created_at  │
│ status      │         └─────────────┘
│ sent_at     │
└─────────────┘
```

### 2.2 表结构设计

#### users (用户表)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'admin' | 'user'
    avatar_url VARCHAR(500),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### ip_projects (IP 项目表)

```sql
CREATE TABLE ip_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- '美妆' | '科技' | '美食' | '时尚' | '其他'
    description TEXT,
    avatar_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'active', -- 'active' | 'paused' | 'archived'
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ip_projects_user_id ON ip_projects(user_id);
CREATE INDEX idx_ip_projects_status ON ip_projects(status);
CREATE INDEX idx_ip_projects_category ON ip_projects(category);
```

#### research (IP 调研表)

```sql
CREATE TABLE research (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES ip_projects(id) ON DELETE CASCADE,
    answers JSONB NOT NULL, -- 问卷答案
    audio_url VARCHAR(500),
    transcript TEXT,
    persona JSONB, -- AI 生成的人物画像
    status VARCHAR(50) DEFAULT 'draft', -- 'draft' | 'completed' | 'analyzing'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_research_project_id ON research(project_id);
CREATE INDEX idx_research_status ON research(status);
```

**answers 字段结构**：
```json
{
  "name": "IP 名称",
  "category": "美妆",
  "target_audience": "18-25岁女性",
  "content_style": "活泼有趣",
  "unique_value": "专业彩妆师背景",
  "goals": ["涨粉", "变现"]
}
```

**persona 字段结构**：
```json
{
  "name": "小美",
  "tagline": "你的专业彩妆闺蜜",
  "positioning": "专业彩妆师 + 亲切朋友",
  "target_audience": {
    "age_range": "18-25",
    "gender": "女性",
    "interests": ["美妆", "时尚", "生活"]
  },
  "content_style": "活泼、专业、接地气",
  "unique_value": "10年彩妆师经验",
  "tags": ["美妆教程", "产品测评", "护肤知识"]
}
```

#### plans (运营规划表)

```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES ip_projects(id) ON DELETE CASCADE,
    research_id UUID REFERENCES research(id),
    content JSONB NOT NULL, -- 规划内容
    status VARCHAR(50) DEFAULT 'draft', -- 'draft' | 'reviewing' | 'approved'
    created_by UUID REFERENCES users(id),
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_plans_project_id ON plans(project_id);
CREATE INDEX idx_plans_status ON plans(status);
```

**content 字段结构**：
```json
{
  "positioning": "专业彩妆师 + 亲切朋友",
  "target_audience": "18-25岁女性，对美妆感兴趣的初级学习者",
  "content_strategy": [
    {
      "type": "教程类",
      "frequency": "每周3次",
      "examples": ["新手化妆教程", "产品测评"]
    },
    {
      "type": "分享类",
      "frequency": "每周2次",
      "examples": ["日常妆容", "护肤心得"]
    }
  ],
  "publishing_schedule": {
    "platforms": ["小红书", "抖音"],
    "best_times": ["早8点", "晚8点"],
    "frequency": "每天1-2篇"
  },
  "growth_targets": {
    "1个月": "1000粉丝",
    "3个月": "5000粉丝",
    "6个月": "20000粉丝"
  },
  "risk_assessment": "竞争激烈，需要突出专业性和亲和力"
}
```

#### contents (采集内容表)

```sql
CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES ip_projects(id) ON DELETE CASCADE,
    source_url VARCHAR(500) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- 'xiaohongshu' | 'douyin' | 'kuaishou'
    title VARCHAR(500),
    content TEXT,
    author VARCHAR(100),
    author_url VARCHAR(500),
    images TEXT[], -- 图片URL数组
    video_url VARCHAR(500),
    metrics JSONB, -- 互动数据
    score DECIMAL(3,2), -- AI 评分 0-1
    tags VARCHAR(100)[],
    collected_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contents_project_id ON contents(project_id);
CREATE INDEX idx_contents_platform ON contents(platform);
CREATE INDEX idx_contents_score ON contents(score);
CREATE INDEX idx_contents_collected_at ON contents(collected_at);
```

**metrics 字段结构**：
```json
{
  "likes": 1234,
  "comments": 56,
  "shares": 23,
  "views": 50000,
  "engagement_rate": 2.6
}
```

#### rewrites (改写记录表)

```sql
CREATE TABLE rewrites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    original_text TEXT NOT NULL,
    rewritten_text TEXT NOT NULL,
    rewrite_mode VARCHAR(50), -- 'keep_meaning' | 'change_style' | 'adjust_length'
    style VARCHAR(50), -- 'lively' | 'professional' | 'humorous'
    platform VARCHAR(50), -- 'xiaohongshu' | 'douyin'
    status VARCHAR(50) DEFAULT 'draft', -- 'draft' | 'approved' | 'published'
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rewrites_content_id ON rewrites(content_id);
CREATE INDEX idx_rewrites_status ON rewrites(status);
```

#### publishes (发布记录表)

```sql
CREATE TABLE publishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rewrite_id UUID NOT NULL REFERENCES rewrites(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES ip_projects(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    platform_post_id VARCHAR(100), -- 平台返回的帖子ID
    status VARCHAR(50) DEFAULT 'pending', -- 'pending' | 'publishing' | 'published' | 'failed'
    error_message TEXT,
    scheduled_at TIMESTAMP,
    published_at TIMESTAMP,
    metrics JSONB, -- 发布后的数据
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_publishes_rewrite_id ON publishes(rewrite_id);
CREATE INDEX idx_publishes_project_id ON publishes(project_id);
CREATE INDEX idx_publishes_status ON publishes(status);
CREATE INDEX idx_publishes_scheduled_at ON publishes(scheduled_at);
```

#### push_tasks (推送任务表)

```sql
CREATE TABLE push_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES ip_projects(id) ON DELETE CASCADE,
    content_ids UUID[] NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    sent_at TIMESTAMP,
    channels VARCHAR(50)[] NOT NULL, -- ['feishu', 'email', 'web']
    status VARCHAR(50) DEFAULT 'pending', -- 'pending' | 'sent' | 'failed'
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_push_tasks_project_id ON push_tasks(project_id);
CREATE INDEX idx_push_tasks_scheduled_at ON push_tasks(scheduled_at);
CREATE INDEX idx_push_tasks_status ON push_tasks(status);
```

#### analytics (数据统计表)

```sql
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES ip_projects(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(project_id, date, platform)
);

CREATE INDEX idx_analytics_project_id ON analytics(project_id);
CREATE INDEX idx_analytics_date ON analytics(date);
CREATE INDEX idx_analytics_platform ON analytics(platform);
```

**metrics 字段结构**：
```json
{
  "followers": {
    "total": 5000,
    "growth": 123,
    "growth_rate": 2.5
  },
  "engagement": {
    "likes": 1200,
    "comments": 56,
    "shares": 23,
    "rate": 2.6
  },
  "content": {
    "published": 10,
    "total_views": 50000,
    "avg_views": 5000
  }
}
```

---

## 3. MongoDB 数据库设计

### 3.1 集合结构

#### crawler_logs (爬虫日志)

```javascript
{
  _id: ObjectId,
  platform: String, // 'xiaohongshu' | 'douyin'
  task_id: String,
  status: String, // 'running' | 'completed' | 'failed'
  started_at: Date,
  completed_at: Date,
  items_count: Number,
  error: String,
  metadata: {}
}
```

#### content_raw (原始内容数据)

```javascript
{
  _id: ObjectId,
  source_url: String,
  platform: String,
  raw_data: {}, // 爬取的原始数据
  parsed_at: Date,
  created_at: Date
}
```

#### system_logs (系统日志)

```javascript
{
  _id: ObjectId,
  level: String, // 'info' | 'warn' | 'error'
  message: String,
  user_id: String,
  project_id: String,
  action: String,
  metadata: {},
  created_at: Date
}
```

---

## 4. Redis 数据结构

### 4.1 缓存键设计

```
# 用户会话
session:{user_id}: { user_data } TTL: 24h

# IP 项目缓存
project:{project_id}: { project_data } TTL: 1h

# 内容采集队列
collector:queue: [ task_id, ... ]

# 推送任务队列
push:queue: [ task_id, ... ]

# 改写任务队列
rewrite:queue: [ task_id, ... ]

# 发布任务队列
publish:queue: [ task_id, ... ]

# 限流
rate_limit:{user_id}:{action}: count TTL: 1min

# 布隆过滤器（去重）
bloom:collected_urls: { url_hash }

# 热点内容
hot:contents:{project_id}: [ content_ids ] TTL: 1h
```

---

## 5. 数据迁移策略

### 5.1 初始化脚本

```sql
-- 初始化数据库
CREATE DATABASE ip_architect_hub;

-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- 全文搜索

-- 创建表（见上）
```

### 5.2 种子数据

```sql
-- 插入测试用户
INSERT INTO users (email, name, password_hash, role) VALUES
('admin@iphub.com', 'Admin', '$2b$10$...', 'admin');

-- 插入示例项目
INSERT INTO ip_projects (user_id, name, category, description) VALUES
('{user_id}', '美妆博主小美', '美妆', '专业彩妆师IP');
```

---

## 6. 数据备份策略

### 6.1 备份计划

- **全量备份**：每天凌晨 3 点
- **增量备份**：每 4 小时
- **日志备份**：实时归档

### 6.2 恢复策略

- **RTO**（恢复时间目标）：< 1 小时
- **RPO**（恢复点目标）：< 5 分钟

---

## 7. 数据安全

### 7.1 敏感数据加密

```sql
-- 使用 pgcrypto 加密敏感字段
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 加密示例
UPDATE users SET
  email = pgp_sym_encrypt(email, 'encryption_key');
```

### 7.2 数据脱敏

```sql
-- 日志中隐藏敏感信息
CREATE OR REPLACE FUNCTION mask_email(email TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN SUBSTRING(email FROM 1 FOR 1) || '***@' || SUBSTRING(email FROM '@' FOR 1);
END;
$$ LANGUAGE plpgsql;
```

---

## 8. 性能优化

### 8.1 索引优化

```sql
-- 复合索引
CREATE INDEX idx_contents_project_score ON contents(project_id, score DESC);
CREATE INDEX idx_analytics_project_date ON analytics(project_id, date DESC);

-- 部分索引
CREATE INDEX idx_active_projects ON ip_projects(user_id) WHERE status = 'active';

-- 表达式索引
CREATE INDEX idx_contents_lower_title ON contents(LOWER(title));
```

### 8.2 分区策略

```sql
-- 按月分区 analytics 表
CREATE TABLE analytics_2026_03 PARTITION OF analytics
FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
```

---

## 9. 监控指标

### 9.1 数据库监控

- 连接数
- 查询性能
- 慢查询日志
- 缓存命中率
- 磁盘使用

### 9.2 告警规则

- 连接数 > 80%
- 查询时间 > 1s
- 磁盘使用 > 80%
- 复制延迟 > 10s

---

## 版本历史

- **v1.0** (2026-03-25): 初始数据库设计
