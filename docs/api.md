# IP Architect Hub - API 文档

## API 概述

IP Architect Hub 提供 **RESTful API**，支持 JSON 格式请求和响应。

**Base URL**: `http://localhost:3000/api`

**认证方式**: Bearer Token (JWT)

---

## 1. 认证接口

### 1.1 用户注册

```http
POST /api/auth/register
```

**请求体**：
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "用户名",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

### 1.2 用户登录

```http
POST /api/auth/login
```

**请求体**：
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "jwt_token"
  }
}
```

---

## 2. IP 项目管理

### 2.1 创建项目

```http
POST /api/projects
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "name": "美妆博主小美",
  "category": "美妆",
  "description": "专业彩妆师IP",
  "avatar_url": "https://..."
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "美妆博主小美",
    "category": "美妆",
    "status": "active",
    "created_at": "2026-03-25T00:00:00Z"
  }
}
```

### 2.2 获取项目列表

```http
GET /api/projects
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "uuid",
        "name": "美妆博主小美",
        "category": "美妆",
        "status": "active",
        "analytics": {
          "followers": 5000,
          "growth_rate": 2.5
        }
      }
    ],
    "total": 1
  }
}
```

### 2.3 切换项目

```http
POST /api/projects/:id/switch
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "current_project": {...}
  }
}
```

---

## 3. IP 调研模块

### 3.1 创建调研

```http
POST /api/research
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "answers": {
    "name": "IP 名称",
    "category": "美妆",
    "target_audience": "18-25岁女性",
    "content_style": "活泼有趣",
    "unique_value": "专业彩妆师背景"
  }
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "analyzing",
    "message": "正在分析调研数据"
  }
}
```

### 3.2 上传语音

```http
POST /api/research/voice
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求体**：
```
audio: <音频文件>
project_id: uuid
```

**响应**：
```json
{
  "success": true,
  "data": {
    "audio_url": "https://...",
    "transcript": "语音转文字内容"
  }
}
```

### 3.3 获取调研结果

```http
GET /api/research/:id
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "persona": {
      "name": "小美",
      "tagline": "你的专业彩妆闺蜜",
      "positioning": "专业彩妆师 + 亲切朋友",
      "target_audience": {
        "age_range": "18-25",
        "gender": "女性",
        "interests": ["美妆", "时尚"]
      },
      "content_style": "活泼、专业、接地气",
      "tags": ["美妆教程", "产品测评"]
    },
    "status": "completed"
  }
}
```

---

## 4. 运营规划模块

### 4.1 生成规划

```http
POST /api/plan/generate
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "research_id": "uuid"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": {
      "positioning": "专业彩妆师 + 亲切朋友",
      "target_audience": "18-25岁女性",
      "content_strategy": [
        {
          "type": "教程类",
          "frequency": "每周3次",
          "examples": ["新手化妆教程", "产品测评"]
        }
      ],
      "publishing_schedule": {
        "platforms": ["小红书", "抖音"],
        "best_times": ["早8点", "晚8点"],
        "frequency": "每天1-2篇"
      },
      "growth_targets": {
        "1个月": "1000粉丝",
        "3个月": "5000粉丝"
      }
    },
    "status": "draft"
  }
}
```

### 4.2 审核规划

```http
POST /api/plan/:id/approve
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "status": "approved",
    "approved_at": "2026-03-25T00:00:00Z"
  }
}
```

### 4.3 导出规划

```http
GET /api/plan/:id/export
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "download_url": "https://...",
    "format": "pdf"
  }
}
```

---

## 5. 内容采集模块

### 5.1 启动采集

```http
POST /api/collector/start
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "platforms": ["xiaohongshu", "douyin"],
  "keywords": ["美妆教程", "产品测评"],
  "limit": 50
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "task_id": "uuid",
    "status": "running",
    "estimated_time": "10分钟"
  }
}
```

### 5.2 查询采集状态

```http
GET /api/collector/status/:task_id
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "task_id": "uuid",
    "status": "completed",
    "progress": 100,
    "collected": 50,
    "failed": 0
  }
}
```

### 5.3 获取采集内容

```http
GET /api/collector/contents?project_id={uuid}&page=1&limit=20
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "contents": [
      {
        "id": "uuid",
        "title": "标题",
        "source_url": "https://...",
        "platform": "xiaohongshu",
        "author": "作者",
        "metrics": {
          "likes": 1234,
          "comments": 56
        },
        "score": 0.85,
        "collected_at": "2026-03-25T00:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

### 5.4 AI 筛选内容

```http
POST /api/collector/filter
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "content_ids": ["uuid1", "uuid2"],
  "criteria": {
    "min_score": 0.7,
    "platforms": ["xiaohongshu"],
    "tags": ["教程"]
  }
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "filtered": ["uuid1"],
    "removed": ["uuid2"]
  }
}
```

---

## 6. 推送系统

### 6.1 设置推送时间

```http
POST /api/push/schedule
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "content_ids": ["uuid1", "uuid2"],
  "scheduled_at": "2026-03-26T09:00:00Z",
  "channels": ["feishu", "email"]
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "task_id": "uuid",
    "status": "scheduled"
  }
}
```

### 6.2 查看推送历史

```http
GET /api/push/history?project_id={uuid}
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "content_count": 5,
        "channels": ["feishu"],
        "scheduled_at": "2026-03-26T09:00:00Z",
        "sent_at": "2026-03-26T09:00:05Z",
        "status": "sent"
      }
    ]
  }
}
```

### 6.3 测试推送

```http
POST /api/push/test
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "channel": "feishu",
  "message": "测试消息"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "sent": true,
    "message": "测试推送成功"
  }
}
```

---

## 7. AI 改写模块

### 7.1 开始改写

```http
POST /api/rewrite
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "content_id": "uuid",
  "mode": "keep_meaning",
  "style": "lively",
  "platform": "xiaohongshu"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "rewriting",
    "estimated_time": "30秒"
  }
}
```

### 7.2 获取改写结果

```http
GET /api/rewrite/:id
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "original_text": "原文内容...",
    "rewritten_text": "改写后内容...",
    "diff": ["差异对比"],
    "status": "completed"
  }
}
```

### 7.3 批量改写

```http
POST /api/rewrite/batch
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "content_ids": ["uuid1", "uuid2"],
  "config": {
    "mode": "keep_meaning",
    "style": "lively",
    "platform": "xiaohongshu"
  }
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "batch_id": "uuid",
    "total": 2,
    "status": "processing"
  }
}
```

---

## 8. 多平台发布

### 8.1 绑定平台账号

```http
POST /api/publish/platform
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "platform": "xiaohongshu",
  "auth_code": "授权码"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "account_id": "uuid",
    "platform": "xiaohongshu",
    "username": "用户名",
    "avatar": "https://..."
  }
}
```

### 8.2 获取绑定账号列表

```http
GET /api/publish/accounts
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "uuid",
        "platform": "xiaohongshu",
        "username": "用户名",
        "followers": 5000,
        "status": "active"
      }
    ]
  }
}
```

### 8.3 发布内容

```http
POST /api/publish/content
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "rewrite_id": "uuid",
  "platforms": ["xiaohongshu", "douyin"],
  "scheduled_at": "2026-03-26T10:00:00Z"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "publish_id": "uuid",
    "status": "scheduled",
    "platforms": ["xiaohongshu", "douyin"]
  }
}
```

### 8.4 查询发布状态

```http
GET /api/publish/status/:id
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "platforms": [
      {
        "platform": "xiaohongshu",
        "status": "published",
        "post_url": "https://...",
        "published_at": "2026-03-26T10:00:00Z"
      },
      {
        "platform": "douyin",
        "status": "pending",
        "scheduled_at": "2026-03-26T10:05:00Z"
      }
    ]
  }
}
```

---

## 9. 数据分析

### 9.1 获取总览数据

```http
GET /api/analytics/overview?project_id={uuid}&date_range=7d
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
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
    },
    "trends": [
      {"date": "2026-03-19", "followers": 4877},
      {"date": "2026-03-20", "followers": 4900},
      {"date": "2026-03-21", "followers": 4920},
      {"date": "2026-03-22", "followers": 4950},
      {"date": "2026-03-23", "followers": 4980},
      {"date": "2026-03-24", "followers": 4990},
      {"date": "2026-03-25", "followers": 5000}
    ]
  }
}
```

### 9.2 获取趋势数据

```http
GET /api/analytics/trends?project_id={uuid}&metric=followers&period=30d
Authorization: Bearer {token}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "metric": "followers",
    "period": "30d",
    "data": [
      {"date": "2026-02-24", "value": 3000},
      {"date": "2026-02-25", "value": 3100},
      ...
    ],
    "summary": {
      "start": 3000,
      "end": 5000,
      "growth": 2000,
      "growth_rate": 66.7
    }
  }
}
```

### 9.3 竞品对比

```http
POST /api/analytics/competitor
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "competitors": [
    {"platform": "xiaohongshu", "account_id": "competitor1"},
    {"platform": "xiaohongshu", "account_id": "competitor2"}
  ],
  "metrics": ["followers", "engagement_rate"]
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "comparison": [
      {
        "account": "我的IP",
        "followers": 5000,
        "engagement_rate": 2.6
      },
      {
        "account": "竞品1",
        "followers": 10000,
        "engagement_rate": 3.2
      },
      {
        "account": "竞品2",
        "followers": 8000,
        "engagement_rate": 2.8
      }
    ]
  }
}
```

### 9.4 生成报告

```http
POST /api/analytics/report
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "project_id": "uuid",
  "date_range": "30d",
  "include_sections": ["overview", "trends", "top_content", "recommendations"]
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "report_id": "uuid",
    "download_url": "https://...",
    "format": "pdf"
  }
}
```

---

## 10. WebSocket 接口

### 10.1 连接

```javascript
const ws = new WebSocket('ws://localhost:3000/ws');

// 认证
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt_token'
}));
```

### 10.2 订阅项目更新

```javascript
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'project',
  project_id: 'uuid'
}));
```

### 10.3 接收实时更新

```javascript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch(data.type) {
    case 'content.collected':
      // 新内容采集完成
      break;
    case 'rewrite.completed':
      // 改写完成
      break;
    case 'publish.status_update':
      // 发布状态更新
      break;
    case 'analytics.update':
      // 数据更新
      break;
  }
};
```

---

## 11. 错误处理

### 11.1 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

### 11.2 常见错误码

| 错误码 | HTTP 状态 | 描述 |
|--------|----------|------|
| `UNAUTHORIZED` | 401 | 未认证 |
| `FORBIDDEN` | 403 | 无权限 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `VALIDATION_ERROR` | 400 | 参数验证失败 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `RATE_LIMIT_EXCEEDED` | 429 | 请求过于频繁 |
| `QUOTA_EXCEEDED` | 403 | 配额超限 |

---

## 12. 限流规则

### 12.1 速率限制

| 接口类型 | 限制 |
|----------|------|
| 认证接口 | 10 次/分钟 |
| 数据查询 | 100 次/分钟 |
| 内容操作 | 30 次/分钟 |
| AI 改写 | 10 次/小时 |
| 平台发布 | 20 次/小时 |

### 12.2 配额限制

| 用户类型 | 月配额 |
|----------|--------|
| 免费用户 | 100 次改写 |
| 基础用户 | 500 次改写 |
| 专业用户 | 无限制 |

---

## 13. Webhook

### 13.1 配置 Webhook

```http
POST /api/webhook
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["content.collected", "rewrite.completed", "publish.status_update"],
  "secret": "webhook_secret"
}
```

### 13.2 Webhook 事件

```json
{
  "event": "content.collected",
  "timestamp": "2026-03-25T00:00:00Z",
  "data": {
    "project_id": "uuid",
    "content_id": "uuid",
    "title": "内容标题"
  },
  "signature": "sha256_hmac"
}
```

---

## 版本历史

- **v1.0** (2026-03-25): 初始 API 设计
