/**
 * IP 调研问卷 - 48 题结构化问卷
 * 基于 IP 调研知识库整理
 */

import { IPResearchQuestion } from '@/types/knowledge';

/**
 * 模块 1: IP 背景洞察 (Who Are You?)
 * 共 8 题
 */
const module1Questions: IPResearchQuestion[] = [
  {
    id: 'M1-01',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您的姓名/昵称是？',
    type: 'text',
    required: true,
    weight: 1,
    category: 'background',
    orderInModule: 1
  },
  {
    id: 'M1-02',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您的职业背景是？',
    type: 'choice',
    options: ['行业专家', '创业者', '职场达人', '生活达人', '学生', '其他'],
    required: true,
    weight: 2,
    category: 'background',
    orderInModule: 2
  },
  {
    id: 'M1-03',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您在当前领域有多少年经验？',
    type: 'choice',
    options: ['1年以下', '1-3年', '3-5年', '5-10年', '10年以上'],
    required: true,
    weight: 2,
    category: 'background',
    orderInModule: 3
  },
  {
    id: 'M1-04',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您的核心专业技能是什么？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'background',
    orderInModule: 4
  },
  {
    id: 'M1-05',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您最引以为豪的成就是什么？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'background',
    orderInModule: 5
  },
  {
    id: 'M1-06',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您的性格特质是？',
    type: 'multi_choice',
    options: ['幽默风趣', '温暖亲切', '专业严谨', '犀利直接', '温和内敛', '热情奔放'],
    required: true,
    weight: 2,
    category: 'background',
    orderInModule: 6
  },
  {
    id: 'M1-07',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '您希望通过 IP 达成什么目标？',
    type: 'multi_choice',
    options: ['个人品牌建设', '副业收入', '职业转型', '影响力扩展', '知识分享', '社交拓展'],
    required: true,
    weight: 3,
    category: 'background',
    orderInModule: 7
  },
  {
    id: 'M1-08',
    module: 1,
    moduleTitle: 'IP 背景洞察',
    question: '用三个词描述您自己',
    type: 'text',
    required: true,
    weight: 2,
    category: 'background',
    orderInModule: 8
  }
];

/**
 * 模块 2: 受众与市场洞察 (Who Do You Serve?)
 * 共 9 题
 */
const module2Questions: IPResearchQuestion[] = [
  {
    id: 'M2-01',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众年龄段是？',
    type: 'choice',
    options: ['18-25岁', '25-35岁', '35-45岁', '45岁以上'],
    required: true,
    weight: 3,
    category: 'audience',
    orderInModule: 1
  },
  {
    id: 'M2-02',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众性别是？',
    type: 'choice',
    options: ['主要是女性', '主要是男性', '男女均衡'],
    required: true,
    weight: 2,
    category: 'audience',
    orderInModule: 2
  },
  {
    id: 'M2-03',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众职业特征是？',
    type: 'multi_choice',
    options: ['学生', '职场新人', '中高层管理者', '创业者', '自由职业者', '全职妈妈/爸爸'],
    required: true,
    weight: 2,
    category: 'audience',
    orderInModule: 3
  },
  {
    id: 'M2-04',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众收入水平是？',
    type: 'choice',
    options: ['低收入', '中等收入', '中高收入', '高收入'],
    required: true,
    weight: 2,
    category: 'audience',
    orderInModule: 4
  },
  {
    id: 'M2-05',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众最关心的痛点是什么？',
    type: 'multi_choice',
    options: ['职业发展', '情感关系', '生活质量', '个人成长', '财务管理', '健康养生'],
    required: true,
    weight: 3,
    category: 'audience',
    orderInModule: 5
  },
  {
    id: 'M2-06',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的目标受众在消费时最看重什么？',
    type: 'multi_choice',
    options: ['性价比', '品质', '品牌', '个性化', '便利性', '社交属性'],
    required: true,
    weight: 2,
    category: 'audience',
    orderInModule: 6
  },
  {
    id: 'M2-07',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您希望受众在什么场景下观看您的内容？',
    type: 'multi_choice',
    options: ['通勤路上', '睡前', '工作间隙', '周末休闲', '学习提升时', '需要鼓励时'],
    required: true,
    weight: 2,
    category: 'audience',
    orderInModule: 7
  },
  {
    id: 'M2-08',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您的主要竞争对手是谁？',
    type: 'text',
    required: false,
    weight: 1,
    category: 'audience',
    orderInModule: 8
  },
  {
    id: 'M2-09',
    module: 2,
    moduleTitle: '受众与市场洞察',
    question: '您认为自己与竞品的差异是什么？',
    type: 'text',
    required: false,
    weight: 2,
    category: 'audience',
    orderInModule: 9
  }
];

/**
 * 模块 3: IP 独特性 (Why You?)
 * 共 7 题
 */
const module3Questions: IPResearchQuestion[] = [
  {
    id: 'M3-01',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您与同领域创作者的最大区别是什么？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'uniqueness',
    orderInModule: 1
  },
  {
    id: 'M3-02',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您有什么独特的经历或故事？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'uniqueness',
    orderInModule: 2
  },
  {
    id: 'M3-03',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您的专业观点有什么独特之处？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'uniqueness',
    orderInModule: 3
  },
  {
    id: 'M3-04',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您的内容风格有什么特色？',
    type: 'multi_choice',
    options: ['幽默风趣', '深度分析', '温暖治愈', '犀利观点', '实用干货', '故事讲述'],
    required: true,
    weight: 2,
    category: 'uniqueness',
    orderInModule: 4
  },
  {
    id: 'M3-05',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您有什么别人没有的资源或优势？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'uniqueness',
    orderInModule: 5
  },
  {
    id: 'M3-06',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '如果用一句话总结您的 IP，会是什么？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'uniqueness',
    orderInModule: 6
  },
  {
    id: 'M3-07',
    module: 3,
    moduleTitle: 'IP 独特性',
    question: '您希望受众记住您的什么标签？',
    type: 'text',
    required: true,
    weight: 2,
    category: 'uniqueness',
    orderInModule: 7
  }
];

/**
 * 模块 4: 核心价值交付 (What Can You Deliver?)
 * 共 8 题
 */
const module4Questions: IPResearchQuestion[] = [
  {
    id: 'M4-01',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您能带给受众的核心价值是什么？',
    type: 'multi_choice',
    options: ['知识增量', '情感共鸣', '娱乐放松', '生活灵感', '实用技巧', '人脉资源'],
    required: true,
    weight: 3,
    category: 'value',
    orderInModule: 1
  },
  {
    id: 'M4-02',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您最擅长解决什么问题？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'value',
    orderInModule: 2
  },
  {
    id: 'M4-03',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您的专业见解能帮受众避免什么错误？',
    type: 'text',
    required: true,
    weight: 2,
    category: 'value',
    orderInModule: 3
  },
  {
    id: 'M4-04',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您的内容能给受众带来什么实际改变？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'value',
    orderInModule: 4
  },
  {
    id: 'M4-05',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您希望建立什么样的情感连接？',
    type: 'multi_choice',
    options: ['信任感', '亲近感', '崇拜感', '共鸣感', '归属感', '启发感'],
    required: true,
    weight: 2,
    category: 'value',
    orderInModule: 5
  },
  {
    id: 'M4-06',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您的核心价值观是什么？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'value',
    orderInModule: 6
  },
  {
    id: 'M4-07',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您愿意为受众提供哪些免费价值？',
    type: 'multi_choice',
    options: ['专业咨询', '干货教程', '资源分享', '情绪价值', '工具推荐', '经验传授'],
    required: true,
    weight: 2,
    category: 'value',
    orderInModule: 7
  },
  {
    id: 'M4-08',
    module: 4,
    moduleTitle: '核心价值交付',
    question: '您有什么独家的方法论或体系？',
    type: 'text',
    required: false,
    weight: 2,
    category: 'value',
    orderInModule: 8
  }
];

/**
 * 模块 5: 内容方向构建 (What Will You Speak?)
 * 共 9 题
 */
const module5Questions: IPResearchQuestion[] = [
  {
    id: 'M5-01',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您最擅长的内容形式是？',
    type: 'multi_choice',
    options: ['干货教程', '经验分享', '观点评论', '生活记录', '剧情内容', '访谈对话'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 1
  },
  {
    id: 'M5-02',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您最想分享的主题领域是？',
    type: 'text',
    required: true,
    weight: 3,
    category: 'content',
    orderInModule: 2
  },
  {
    id: 'M5-03',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您能持续输出的内容方向有哪些？（最多3个）',
    type: 'text',
    required: true,
    weight: 3,
    category: 'content',
    orderInModule: 3
  },
  {
    id: 'M5-04',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您希望采用什么内容形式？',
    type: 'multi_choice',
    options: ['短视频', '长视频', '图文', '直播', '音频', '混合形式'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 4
  },
  {
    id: 'M5-05',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您的更新频率计划是？',
    type: 'choice',
    options: ['日更', '一周3-4次', '一周1-2次', '月更'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 5
  },
  {
    id: 'M5-06',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您的主要内容来源是什么？',
    type: 'multi_choice',
    options: ['个人经验', '专业研究', '行业观察', '用户提问', '热点追踪', '跨界启发'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 6
  },
  {
    id: 'M5-07',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您最擅长的话题切入点是？',
    type: 'multi_choice',
    options: ['痛点解决', '趋势分析', '方法教学', '观点碰撞', '故事讲述', '资源整合'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 7
  },
  {
    id: 'M5-08',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您希望内容给受众的第一印象是？',
    type: 'multi_choice',
    options: ['专业权威', '亲切可信', '新颖有趣', '实用有用', '深刻有洞见', '温暖治愈'],
    required: true,
    weight: 2,
    category: 'content',
    orderInModule: 8
  },
  {
    id: 'M5-09',
    module: 5,
    moduleTitle: '内容方向构建',
    question: '您有什么特别想表达的观点或态度？',
    type: 'text',
    required: false,
    weight: 2,
    category: 'content',
    orderInModule: 9
  }
];

/**
 * 模块 6: 输出交付物 - 仅作为总结模块
 * 不包含问题，而是定义输出成果
 */
const module6Output = {
  moduleId: 6,
  moduleTitle: '输出交付物',
  deliverables: [
    'IP 人物画像',
    '目标受众画像',
    'IP 核心定位',
    '内容支柱矩阵',
    '品牌调性指南',
    '风险评估报告'
  ]
};

/**
 * 完整的调研问卷（48题）
 */
export const RESEARCH_QUESTIONS: IPResearchQuestion[] = [
  ...module1Questions,
  ...module2Questions,
  ...module3Questions,
  ...module4Questions,
  ...module5Questions
];

/**
 * 按模块分组的问题
 */
export const QUESTIONS_BY_MODULE = {
  1: module1Questions,
  2: module2Questions,
  3: module3Questions,
  4: module4Questions,
  5: module5Questions,
  6: [] // 模块6无问题，仅输出
};

/**
 * 按分类分组的问题
 */
export const QUESTIONS_BY_CATEGORY = {
  background: RESEARCH_QUESTIONS.filter(q => q.category === 'background'),
  audience: RESEARCH_QUESTIONS.filter(q => q.category === 'audience'),
  uniqueness: RESEARCH_QUESTIONS.filter(q => q.category === 'uniqueness'),
  value: RESEARCH_QUESTIONS.filter(q => q.category === 'value'),
  content: RESEARCH_QUESTIONS.filter(q => q.category === 'content')
};

/**
 * 模块元信息
 */
export const MODULE_INFO = {
  1: { title: 'IP 背景洞察', questionCount: 8, description: '了解 IP 的基本背景和定位基础' },
  2: { title: '受众与市场洞察', questionCount: 9, description: '明确目标受众和市场定位' },
  3: { title: 'IP 独特性', questionCount: 7, description: '挖掘差异化竞争优势' },
  4: { title: '核心价值交付', questionCount: 8, description: '定义能提供的核心价值' },
  5: { title: '内容方向构建', questionCount: 9, description: '规划内容方向和形式' },
  6: { title: '输出交付物', questionCount: 0, description: '生成最终的 IP 规划文档' }
};

/**
 * 工具函数：获取指定模块的问题
 */
export function getQuestionsByModule(moduleId: number): IPResearchQuestion[] {
  return QUESTIONS_BY_MODULE[moduleId] || [];
}

/**
 * 工具函数：获取指定分类的问题
 */
export function getQuestionsByCategory(category: string): IPResearchQuestion[] {
  return QUESTIONS_BY_CATEGORY[category as keyof typeof QUESTIONS_BY_CATEGORY] || [];
}

/**
 * 工具函数：获取单个问题
 */
export function getQuestion(questionId: string): IPResearchQuestion | undefined {
  return RESEARCH_QUESTIONS.find(q => q.id === questionId);
}

/**
 * 工具函数：计算调研完成度
 */
export function calculateProgress(answeredCount: number): number {
  return Math.round((answeredCount / RESEARCH_QUESTIONS.length) * 100);
}

/**
 * 工具函数：获取必答题数量
 */
export function getRequiredQuestionsCount(): number {
  return RESEARCH_QUESTIONS.filter(q => q.required).length;
}
