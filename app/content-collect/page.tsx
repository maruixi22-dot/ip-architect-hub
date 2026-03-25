'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ContentCollectPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [collectedContent, setCollectedContent] = useState<any>(null)
  const [savedItems, setSavedItems] = useState<any[]>([
    { id: 1, title: '职场新人必看：提升效率的5个技巧', source: '小红书', url: 'https://xiaohongshu.com/...', time: '2026-03-26 10:00', tags: ['职场', '效率'] },
    { id: 2, title: '如何实现财务自由的第一步', source: '公众号', url: 'https://mp.weixin.qq.com/...', time: '2026-03-25 15:30', tags: ['理财', '干货'] },
  ])

  const handleCollect = async () => {
    if (!url.trim()) {
      alert('请输入内容链接')
      return
    }

    setLoading(true)
    try {
      // 模拟采集（实际需要调用爬虫或 API）
      await new Promise(resolve => setTimeout(resolve, 1500))

      setCollectedContent({
        title: '示例：采集到的内容标题',
        content: '这是从链接采集到的内容...',
        source: url.includes('xiaohongshu') ? '小红书' : url.includes('weixin') ? '公众号' : '其他',
        url,
        time: new Date().toLocaleString('zh-CN'),
      })
    } catch (error) {
      console.error('采集失败:', error)
      alert('采集失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!collectedContent) return

    setSavedItems([
      {
        id: Date.now(),
        title: collectedContent.title,
        source: collectedContent.source,
        url: collectedContent.url,
        time: collectedContent.time,
        tags: ['新采集'],
      },
      ...savedItems,
    ])

    setCollectedContent(null)
    setUrl('')
    alert('已保存到素材库')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            内容采集
          </h1>
          <p className="text-slate-400 text-lg">
            采集优质内容作为创作素材和参考
          </p>
        </div>

        <Tabs defaultValue="collect" className="max-w-5xl mx-auto">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="collect" className="data-[state=active]:bg-blue-600">
              📥 采集内容
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-blue-600">
              📚 素材库
            </TabsTrigger>
          </TabsList>

          {/* 采集内容 */}
          <TabsContent value="collect">
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">链接采集</CardTitle>
                  <CardDescription className="text-slate-400">
                    粘贴文章或视频链接，AI 自动提取内容
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="url" className="text-slate-300">内容链接</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="粘贴小红书、公众号、抖音等链接..."
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="border-red-600/50 text-red-400 cursor-pointer hover:bg-red-600/10">
                      小红书
                    </Badge>
                    <Badge variant="outline" className="border-green-600/50 text-green-400 cursor-pointer hover:bg-green-600/10">
                      公众号
                    </Badge>
                    <Badge variant="outline" className="border-blue-600/50 text-blue-400 cursor-pointer hover:bg-blue-600/10">
                      抖音
                    </Badge>
                    <Badge variant="outline" className="border-orange-600/50 text-orange-400 cursor-pointer hover:bg-orange-600/10">
                      知乎
                    </Badge>
                  </div>

                  <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm">
                      💡 提示：当前为手动输入模式。自动采集功能需要配置爬虫服务，即将上线。
                    </p>
                  </div>

                  <Button
                    onClick={handleCollect}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? '采集中...' : '📥 开始采集'}
                  </Button>
                </CardContent>
              </Card>

              {/* 采集结果 */}
              {collectedContent && (
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">采集结果</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">标题</Label>
                      <Input
                        value={collectedContent.title}
                        onChange={(e) => setCollectedContent({ ...collectedContent, title: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">来源</Label>
                      <Badge className="mt-2">{collectedContent.source}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                        💾 保存到素材库
                      </Button>
                      <Button
                        onClick={() => setCollectedContent(null)}
                        variant="outline"
                        className="border-slate-700 text-slate-300"
                      >
                        放弃
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 素材库 */}
          <TabsContent value="library">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">我的素材库</CardTitle>
                <CardDescription className="text-slate-400">
                  已采集的内容素材
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-slate-700 text-slate-400">
                              {item.source}
                            </Badge>
                            {item.tags.map((tag: string) => (
                              <Badge key={tag} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-slate-500 text-xs">{item.time}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-700">
                            改写
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-700">
                            删除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {savedItems.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-500">暂无素材，去采集一些内容吧</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
