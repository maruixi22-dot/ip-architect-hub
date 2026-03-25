'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PushPage() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [pushHistory, setPushHistory] = useState<any[]>([
    { id: 1, title: '今日内容推荐', content: '职场新人必看的5个效率技巧...', time: '2026-03-26 09:00', status: '已发送' },
    { id: 2, title: '爆款文案分享', content: '如何写出吸引人的标题...', time: '2026-03-25 18:00', status: '已发送' },
  ])

  const handlePush = async () => {
    if (!content.trim()) {
      alert('请输入推送内容')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/push/feishu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'IP Architect Hub 推送',
          content,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('推送成功！')
        // 添加到历史记录
        setPushHistory([
          {
            id: Date.now(),
            title: title || 'IP Architect Hub 推送',
            content,
            time: new Date().toLocaleString('zh-CN'),
            status: '已发送',
          },
          ...pushHistory,
        ])
        setContent('')
        setTitle('')
      } else {
        alert('推送失败：' + result.error)
      }
    } catch (error) {
      console.error('推送错误:', error)
      alert('推送失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto py-12 px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            内容推送
          </h1>
          <p className="text-slate-400 text-lg">
            定时推送内容到飞书、微信等平台
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="now" className="space-y-6">
            <TabsList className="bg-slate-900/50 border border-slate-800">
              <TabsTrigger value="now" className="data-[state=active]:bg-blue-600">
                ⚡ 立即推送
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-600">
                ⏰ 定时推送
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-blue-600">
                📋 推送历史
              </TabsTrigger>
            </TabsList>

            {/* 立即推送 */}
            <TabsContent value="now">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">立即推送内容</CardTitle>
                  <CardDescription className="text-slate-400">
                    创建并立即发送推送消息
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-slate-300">推送标题（可选）</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="例如：今日内容推荐"
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-slate-300">推送内容</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="输入要推送的内容...&#10;&#10;支持：&#10;- 文字内容&#10;- 链接&#10;- 表情符号"
                      rows={8}
                      className="bg-slate-800 border-slate-700 text-white mt-2 resize-none"
                    />
                  </div>

                  {/* 推送渠道 */}
                  <div>
                    <Label className="text-slate-300 mb-2 block">推送渠道</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-600 cursor-pointer">
                        ✓ 飞书
                      </Badge>
                      <Badge variant="outline" className="border-slate-700 text-slate-500 cursor-not-allowed">
                        微信（开发中）
                      </Badge>
                      <Badge variant="outline" className="border-slate-700 text-slate-500 cursor-not-allowed">
                        钉钉（开发中）
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm">
                      💡 提示：当前已连接飞书 Bot，消息将推送到你的飞书群聊或私聊
                    </p>
                  </div>

                  <Button
                    onClick={handlePush}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? '推送中...' : '📤 立即推送'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 定时推送 */}
            <TabsContent value="scheduled">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">定时推送</CardTitle>
                  <CardDescription className="text-slate-400">
                    设置推送时间，自动发送内容
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-4">🚧</div>
                    <h3 className="text-white font-semibold text-lg mb-2">功能开发中</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      定时推送功能即将上线，敬请期待
                    </p>
                    <p className="text-slate-500 text-xs">
                      计划支持：每日推送、每周推送、自定义时间
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 推送历史 */}
            <TabsContent value="history">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">推送历史</CardTitle>
                  <CardDescription className="text-slate-400">
                    查看过去的推送记录
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pushHistory.map((item) => (
                      <div key={item.id} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold">{item.title}</h4>
                          <Badge variant="outline" className="border-green-600/50 text-green-400">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-sm mb-2 line-clamp-2">
                          {item.content}
                        </p>
                        <p className="text-slate-500 text-xs">{item.time}</p>
                      </div>
                    ))}

                    {pushHistory.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-slate-500">暂无推送记录</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 飞书配置说明 */}
        <Card className="max-w-4xl mx-auto mt-8 bg-green-600/10 border-green-600/30">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">✅ 飞书 Bot 已配置</h3>
            <div className="text-slate-400 text-sm space-y-2">
              <p><strong>App ID：</strong>cli_a936a2a0f5b8dbd9</p>
              <p><strong>状态：</strong>已连接</p>
              <p><strong>功能：</strong>支持文本、链接、富消息推送</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
