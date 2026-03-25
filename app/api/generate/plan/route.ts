import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ipName, targetAudience, expertise } = body

    // 构建提示词
    const prompt = `你是一位专业的 IP 孵化顾问。请为以下 IP 生成一份完整的运营规划方案。

## IP 信息
- IP 名称：${ipName || '未指定'}
- 目标受众：${targetAudience || '未指定'}
- 专业领域：${expertise || '未指定'}

## 请生成完整的运营规划（JSON 格式）：

{
  "contentStrategy": {
    "mainPillar": "主内容支柱",
    "secondaryPillars": ["副支柱1", "副支柱2"],
    "titleTemplates": ["标题1", "标题2", "标题3", "标题4", "标题5", "标题6", "标题7", "标题8"],
    "contentTypes": ["图文", "短视频", "直播"],
    "updateFrequency": "每周更新频率",
    "tone": "内容风格"
  },
  "growthStrategy": {
    "channels": [
      {"name": "小红书", "priority": "核心", "description": "主阵地"},
      {"name": "抖音", "priority": "重要", "description": "引流"}
    ],
    "growthPath": [
      {
        "phase": "冷启动期",
        "period": "1-2月",
        "targetGoal": "1000粉丝",
        "keyActions": ["持续输出", "互动", "学习"]
      },
      {
        "phase": "增长期",
        "period": "3-6月",
        "targetGoal": "10000粉丝",
        "keyActions": ["优化内容", "增加频率", "矩阵"]
      }
    ]
  },
  "monetization": {
    "models": [
      {"name": "广告", "threshold": "5000粉", "potential": "高", "description": "平台分成"},
      {"name": "知识付费", "threshold": "10000粉", "potential": "很高", "description": "课程咨询"}
    ],
    "timeline": [
      {"period": "1-3月", "focus": "内容积累", "expectedRevenue": "0元"},
      {"period": "3-6月", "focus": "探索变现", "expectedRevenue": "1000-5000元/月"},
      {"period": "6-12月", "focus": "稳定变现", "expectedRevenue": "10000-50000元/月"}
    ]
  },
  "actionPlan": {
    "phase1": {
      "period": "第1-3月",
      "title": "基础建设期",
      "goals": ["完成50+内容", "1000+粉丝", "确定风格"],
      "tasks": ["每周更新", "测试方向", "建立流程", "学习规律", "积累粉丝"]
    },
    "phase2": {
      "period": "第4-6月",
      "title": "快速增长期",
      "goals": ["内容质量提升", "5000+粉丝", "探索变现"],
      "tasks": ["优化结构", "增加互动", "拓展渠道", "商业合作", "私域流量"]
    },
    "phase3": {
      "period": "第7-12月",
      "title": "稳定变现期",
      "goals": ["个人品牌", "月入1万+", "持续增长"],
      "tasks": ["付费产品", "社群体系", "优化变现", "合作资源", "品牌影响"]
    }
  }
}

请只返回 JSON，不要有其他内容。`

    // 调用 GLM-5 API
    const apiKey = process.env.GLM_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GLM API Key 未配置' },
        { status: 500 }
      )
    }

    const glmResponse = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-5',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    if (!glmResponse.ok) {
      const error = await glmResponse.text()
      console.error('GLM API Error:', error)
      return NextResponse.json(
        { error: 'AI 生成失败，请稍后重试' },
        { status: 500 }
      )
    }

    const glmData = await glmResponse.json()
    const generatedContent = glmData.choices[0].message.content

    // 解析 JSON
    let result
    try {
      const jsonMatch = generatedContent.match(/```json\n?([\s\S]*?)\n?```/) ||
                       generatedContent.match(/\{[\s\S]*\}/)

      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0])
      } else {
        result = JSON.parse(generatedContent)
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      // 返回默认数据
      result = {
        contentStrategy: {
          mainPillar: '职场技能提升',
          secondaryPillars: ['职场故事分享', '工具方法推荐'],
          titleTemplates: [
            '我是如何用3年时间从月薪5千到年薪50万的',
            '职场新人必看：这5个技巧让你的效率翻倍',
            '后悔知道晚了：工作前3年一定要懂的道理',
          ],
        },
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
    })

  } catch (error) {
    console.error('Generate Plan Error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
