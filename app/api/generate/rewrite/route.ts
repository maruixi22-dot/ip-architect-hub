import { NextRequest, NextResponse } from 'next/server'

// 这个函数在服务器运行，用户看不到
// 当页面调用这个 API 时，它就会执行
export async function POST(request: NextRequest) {
  try {
    // 1. 获取页面传来的数据
    const body = await request.json()
    const { content, tone } = body

    // 2. 验证数据（确保内容不为空）
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: '内容不能为空' },
        { status: 400 }
      )
    }

    // 3. 构建提示词（告诉 AI 怎么改写）
    const prompt = `你是一位专业的内容创作专家。请将以下内容改写成更具吸引力的文案。

## 原始内容
${content}

## 改写要求
- 风格：${tone}
- 目标：提升可读性和吸引力
- 保持核心信息不变
- 使用更生动的表达
- 适当使用表情符号（如果适合）
- 优化段落结构

## 请直接输出改写后的内容，不要解释。`

    // 4. 调用 GLM-5 API
    const apiKey = process.env.GLM_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI 服务未配置' },
        { status: 500 }
      )
    }

    // 发送请求给 GLM-5
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
        temperature: 0.8,  // 0.8 = 比较有创意
        max_tokens: 2000,  // 最多生成 2000 字
      }),
    })

    // 5. 检查 GLM-5 是否返回成功
    if (!glmResponse.ok) {
      const error = await glmResponse.text()
      console.error('GLM API Error:', error)
      return NextResponse.json(
        { error: 'AI 改写失败，请稍后重试' },
        { status: 500 }
      )
    }

    // 6. 解析 GLM-5 的返回结果
    const glmData = await glmResponse.json()
    const rewrittenContent = glmData.choices[0].message.content

    // 7. 返回结果给页面
    return NextResponse.json({
      success: true,
      data: {
        content: rewrittenContent,
        originalLength: content.length,
        rewrittenLength: rewrittenContent.length,
      },
    })

  } catch (error) {
    console.error('Rewrite Error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
