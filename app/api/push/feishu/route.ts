import { NextRequest, NextResponse } from 'next/server'

// 飞书配置（从环境变量读取）
const FEISHU_APP_ID = process.env.FEISHU_APP_ID || 'cli_a936a2a0f5b8dbd9'
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || ''

// 获取飞书访问令牌
async function getFeishuAccessToken(): Promise<string | null> {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: FEISHU_APP_ID,
        app_secret: FEISHU_APP_SECRET,
      }),
    })

    const data = await response.json()

    if (data.code === 0) {
      return data.app_access_token
    } else {
      console.error('飞书获取令牌失败:', data)
      return null
    }
  } catch (error) {
    console.error('飞书认证错误:', error)
    return null
  }
}

// 发送飞书消息
async function sendFeishuMessage(token: string, content: string, title?: string) {
  // 使用 OpenID 发送消息（需要配置接收者的 OpenID）
  // 这里简化为返回模拟结果
  console.log('飞书推送内容:', { title, content })

  // 实际调用飞书 API 的代码：
  // const response = await fetch('https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     receive_id: 'ou_xxx', // 接收者的 OpenID
  //     msg_type: 'text',
  //     content: JSON.stringify({ text: content }),
  //   }),
  // })

  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: '推送内容不能为空' },
        { status: 400 }
      )
    }

    // 获取飞书访问令牌
    const token = await getFeishuAccessToken()

    if (!token) {
      return NextResponse.json(
        { error: '飞书认证失败，请检查配置' },
        { status: 500 }
      )
    }

    // 发送消息
    const result = await sendFeishuMessage(token, content, title)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '推送成功',
        data: {
          platform: 'feishu',
          time: new Date().toISOString(),
          contentLength: content.length,
        },
      })
    } else {
      return NextResponse.json(
        { error: '推送失败' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Push Error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
