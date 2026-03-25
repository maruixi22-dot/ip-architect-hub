'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function AIRewritePage() {
  // 状态：用来存储页面上的数据
  // 这就像 Excel 表格里的单元格，可以存数据也可以改数据
  const [originalContent, setOriginalContent] = useState('')  // 原始内容
  const [rewrittenContent, setRewrittenContent] = useState('')  // 改写后的内容
  const [loading, setLoading] = useState(false)  // 是否正在加载
  const [tone, setTone] = useState('专业')  // 内容风格

  // 当用户点击"开始改写"按钮时，执行这个函数
  const handleRewrite = async () => {
    if (!originalContent.trim()) {
      alert('请先输入要改写的内容')
      return
    }

    setLoading(true)  // 开始加载，显示"改写中..."

    try {
      // 调用我们的 API，让 AI 改写
      const response = await fetch('/api/generate/rewrite', {
        method: 'POST',  // 发送数据给服务器
        headers: { 'Content-Type': 'application/json' },  // 告诉服务器我们发送的是 JSON
        body: JSON.stringify({
          content: originalContent,  // 原始内容
          tone: tone,  // 期望的风格
        }),
      })

      const result = await response.json()

      if (result.success) {
        setRewrittenContent(result.data.content)  // 显示改写结果
      } else {
        alert('改写失败：' + result.error)
      }
    } catch (error) {
      console.error('改写错误:', error)
      alert('改写失败，请稍后重试')
    } finally {
      setLoading(false)  // 结束加载
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto py-12 px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI 智能改写
          </h1>
          <p className="text-slate-400 text-lg">
            输入原始内容，AI 帮你改写成爆款文案
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* 左边：输入区域 */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span>📝</span>
                原始内容
              </CardTitle>
              <CardDescription className="text-slate-400">
                粘贴你想改写的文章、文案或链接
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* 风格选择 */}
              <div>
                <Label className="text-slate-300 mb-2 block">选择风格</Label>
                <div className="flex flex-wrap gap-2">
                  {['专业', '轻松', '幽默', '温暖', '犀利'].map((style) => (
                    <Badge
                      key={style}
                      variant={tone === style ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        tone === style
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                      onClick={() => setTone(style)}
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 输入框 */}
              <Textarea
                placeholder="粘贴你想改写的内容...&#10;&#10;例如：&#10;今天分享一个提升效率的方法。我每天早上会花10分钟规划当天任务，这样能让我更专注地工作..."
                value={originalContent}
                onChange={(e) => setOriginalContent(e.target.value)}
                rows={15}
                className="bg-slate-800 border-slate-700 text-white resize-none"
              />

              {/* 字数统计 */}
              <div className="text-sm text-slate-500">
                {originalContent.length} 字
              </div>

              {/* 改写按钮 */}
              <Button
                onClick={handleRewrite}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'AI 改写中...' : '✨ 开始改写'}
              </Button>
            </CardContent>
          </Card>

          {/* 右边：输出区域 */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span>✨</span>
                改写结果
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI 生成的改写内容
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* 输出框 */}
              <Textarea
                placeholder="改写后的内容会显示在这里...&#10;&#10;点击左侧「开始改写」按钮开始"
                value={rewrittenContent}
                onChange={(e) => setRewrittenContent(e.target.value)}
                rows={15}
                className="bg-slate-800 border-slate-700 text-white resize-none"
                readOnly={!rewrittenContent}
              />

              {/* 字数统计 */}
              <div className="text-sm text-slate-500">
                {rewrittenContent.length} 字
              </div>

              {/* 操作按钮 */}
              {rewrittenContent && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(rewrittenContent)
                      alert('已复制到剪贴板')
                    }}
                    variant="outline"
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    📋 复制
                  </Button>
                  <Button
                    onClick={() => setRewrittenContent('')}
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    🗑️ 清空
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 使用提示 */}
        <Card className="max-w-5xl mx-auto mt-8 bg-blue-600/10 border-blue-600/30">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">💡 使用技巧</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>• 粘贴同行的爆款内容，参考结构但完全改写</li>
              <li>• 选择不同的风格，看看哪种效果最好</li>
              <li>• 改写后的内容可以根据需要再次微调</li>
              <li>• 可以多次改写，选择最满意的版本</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
