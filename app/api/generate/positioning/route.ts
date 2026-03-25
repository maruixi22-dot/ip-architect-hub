import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: 验证输入数据

    // 构建提示词
    const prompt = `你是一位专业的 IP 孵化顾问。基于以下调研信息，生成一份完整的 IP 定位方案。

## 调研信息

### 基本信息
- 姓名：${body.name || '未提供'}
- 职业：${body.profession || '未提供'}
- 从业经验：${body.experience || '未提供'}

### 目标受众
- 目标受众：${body.targetAudience || '未提供'}
- 受众痛点：${body.audiencePainPoint || '未提供'}

### IP 独特性
- 独特价值：${body.uniqueValue || '未提供'}
- 个人故事：${body.personalStory || '未提供'}

### 核心价值
- 价值主张：${body.valueProposition || '未提供'}
- 更新频率：${body.contentFrequency || '未提供'}

### 内容方向
- 内容风格：${body.tone || '未提供'}
- 孵化目标：${body.goals || '未提供'}

## 请生成以下内容（JSON 格式）：

{
  "ipPositioning": {
    "name": "IP 建议名称",
    "tagline": "一句话定位",
    "personality": "IP 人设描述",
    "coreValues": ["核心价值1", "核心价值2", "核心价值3"]
  },
  "targetAudience": {
    "primary": "主要受众描述",
    "demographics": "受众画像",
    "painPoints": ["痛点1", "痛点2", "痛点3"]
  },
  "contentStrategy": {
    "mainPillar": "主内容支柱",
    "secondaryPillars": ["副支柱1", "副支柱2"],
    "contentTypes": ["内容类型1", "内容类型2"],
    "tone": "内容风格建议",
    "titleTemplates": ["标题模板1", "标题模板2", "标题模板3"]
  },
  "differentiation": {
    "uniqueValue": "独特价值主张",
    "competitiveAdvantage": "竞争优势",
    "brandStory": "品牌故事建议"
  },
  "actionPlan": {
    "phase1": "第一阶段建议（1-3月）",
    "phase2": "第二阶段建议（3-6月）",
    "phase3": "第三阶段建议（6-12月）"
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
        max_tokens: 2000,
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

    // 解析 AI 返回的 JSON
    let result
    try {
      // 提取 JSON 部分（可能包含 markdown 代码块）
      const jsonMatch = generatedContent.match(/```json\n?([\s\S]*?)\n?```/) ||
                       generatedContent.match(/\{[\s\S]*\}/)

      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1] || jsonMatch[0])
      } else {
        result = JSON.parse(generatedContent)
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      return NextResponse.json(
        { error: 'AI 返回数据格式错误', raw: generatedContent },
        { status: 500 }
      )
    }

    // TODO: 保存到数据库

    return NextResponse.json({
      success: true,
      data: result,
    })

  } catch (error) {
    console.error('Generate Positioning Error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    )
  }
}
