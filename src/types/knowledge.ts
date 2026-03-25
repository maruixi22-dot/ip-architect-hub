/**
 * 知识库类型定义
 * IP Architect Hub - 知识库系统
 */

// ==================== 调研问题类型 ====================

export type QuestionType = 'text' | 'choice' | 'multi_choice' | 'scale';

export type QuestionCategory =
  | 'background'      // IP 背景洞察
  | 'audience'        // 受众与市场洞察
  | 'uniqueness'      // IP 独特性
  | 'value'           // 核心价值交付
  | 'content'         // 内容方向构建
  | 'outputs';        // 输出交付物

export interface IPResearchQuestion {
  id: string;                    // 问题ID: M1-01
  module: number;                // 模块编号: 1-6
  moduleTitle: string;           // 模块标题
  question: string;              // 问题内容
  type: QuestionType;
  options?: string[];            // 选择题选项
  required: boolean;             // 是否必填
  weight?: number;               // 评分权重
  category: QuestionCategory;
  orderInModule: number;         // 模块内顺序
}

export interface IPResearchResponse {
  id: string;
  ipProjectId: string;
  responses: {
    questionId: string;
    answer: string | string[] | number;
    timestamp: Date;
  }[];
  completedAt?: Date;
  aiAnalysis?: {
    persona: string;             // AI 生成的人物画像
    positioning: string;         // IP 定位
    audience: string;            // 目标受众
    uniqueness: string;          // 独特价值
    contentPillars: string[];    // 内容支柱
    risks: string[];             // 风险提示
  };
  createdAt: Date;
  updatedAt: Date;
}

// ==================== IP 规划类型 ====================

export interface ContentPillar {
  name: string;                   // 支柱名称
  description: string;            // 描述
  contentAngles: string[];        // 内容角度（5个）
  exampleTitles: string[];        // 示例标题（5个）
}

export interface TitleTemplate {
  id?: string;
  pillar: string;                 // 所属支柱
  template: string;               // 标题模板
  type: 'pain' | 'number' | 'counter_intuitive' | 'emotional' | 'story';
  platform?: string;              // 适用平台
  effectivenessScore?: number;    // 效果评分 (0-100)
  usageCount?: number;            // 使用次数
}

export interface IPPlan {
  id: string;
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
  titleTemplates: TitleTemplate[];

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

  createdAt: Date;
  updatedAt: Date;
}

// ==================== 改写规则类型 ====================

export type Platform = 'xiaohongshu' | 'douyin' | 'weibo' | 'wechat' | 'bilibili';

export interface RewriteRequirement {
  length: { min: number; max: number };
  style: string[];                // 风格要求
  keywords: string[];             // 关键词要求
  avoid: string[];                // 禁止词汇
  formatting: string[];           // 格式要求
}

export interface RewriteRule {
  id: string;
  platform: Platform;
  brandTone: string;              // 品牌调性
  requirements: RewriteRequirement;
  bestPractices: string[];        // 最佳实践
  contentStructure: string;       // 内容结构
  examples: {
    original: string;
    rewritten: string;
    reason: string;
  }[];
}

export interface RewriteRequest {
  originalContent: {
    id: string;
    title: string;
    body: string;
    platform: Platform;
  };
  targetPlatform: Platform;
  ipProjectId: string;
  preserveElements: string[];     // 保留元素
  enhanceAspects: string[];       // 增强方面
}

export interface RewriteResult {
  rewrittenContent: {
    title: string;
    body: string;
  };
  changes: string[];              // 修改说明
  toneMatch: number;              // 调性匹配度 (0-1)
  platformScore: number;          // 平台适配度 (0-1)
  suggestions: string[];          // 优化建议
}

// ==================== 内容匹配类型 ====================

export interface ContentMatchScore {
  overall: number;                // 综合匹配度 (0-100)
  topic: number;                  // 话题相关性 (0-100)
  audience: number;               // 受众匹配度 (0-100)
  format: number;                 // 形式适配度 (0-100)
  tone: number;                   // 调性契合度 (0-100)
}

export interface ContentRecommendation {
  contentId: string;
  ipProjectId: string;
  matchScore: ContentMatchScore;
  recommendation: {
    suitable: boolean;            // 是否推荐
    reason: string;               // 推荐理由
    rewriteSuggestions: string[]; // 改写建议
    riskLevel: 'low' | 'medium' | 'high';
  };
  createdAt: Date;
}

// ==================== AI 生成类型 ====================

export interface GeneratePlanRequest {
  researchResponseId: string;
  customRequirements?: string;
  preferences?: {
    contentPillarCount?: number;
    targetAudienceAgeRange?: string;
    monetizationFocus?: string;
  };
}

export interface GeneratePlanResponse {
  plan: IPPlan;
  confidence: number;             // 生成置信度 (0-1)
  warnings?: string[];            // 警告信息
}

export interface AIPromptContext {
  researchData: any;
  positioning?: any;
  contentPillars?: any;
  targetAudience?: any;
  brandTone?: string;
}

// ==================== 数据库模型类型 ====================

export interface KnowledgeQuestionModel {
  id: string;
  module: number;
  module_title: string;
  question: string;
  type: QuestionType;
  options: string[] | null;
  required: boolean;
  weight: number;
  category: string;
  order_in_module: number;
  created_at: Date;
}

export interface TitleTemplateModel {
  id: number;
  pillar: string;
  template: string;
  type: string;
  platform: string | null;
  effectiveness_score: number;
  usage_count: number;
  created_at: Date;
}

export interface RewriteRuleModel {
  id: number;
  platform: string;
  brand_tone: string;
  requirements: RewriteRequirement;
  best_practices: string[];
  content_structure: string;
  created_at: Date;
}

export interface ContentPillarModel {
  id: number;
  name: string;
  description: string;
  category: string;
  content_angles: string[];
  example_titles: string[];
  applicable_domains: string[];
  created_at: Date;
}
