'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function AnalyticsPage() {
  // 模拟数据（后续从数据库获取）
  const stats = {
    totalFans: 5234,
    totalContent: 48,
    totalViews: 125000,
    engagementRate: 8.5,
    growth: {
      fans: '+12.5%',
      views: '+28.3%',
      engagement: '+2.1%',
    },
  }

  const contentData = [
    { title: '职场新人必看的5个效率技巧', views: 12500, likes: 856, comments: 124, date: '2026-03-26' },
    { title: '如何用3年时间从月薪5千到年薪50万', views: 9800, likes: 723, comments: 89, date: '2026-03-25' },
    { title: '后悔知道晚了：工作前3年一定要懂的道理', views: 8500, likes: 645, comments: 76, date: '2026-03-24' },
    { title: '90%的人都不知道的职场潜规则', views: 7200, likes: 512, comments: 65, date: '2026-03-23' },
    { title: '从普通员工到管理者，我只做对了这3件事', views: 6800, likes: 489, comments: 58, date: '2026-03-22' },
  ]

  const growthData = [
    { date: '03-20', fans: 4800, views: 18000 },
    { date: '03-21', fans: 4920, views: 21000 },
    { date: '03-22', fans: 5010, views: 19500 },
    { date: '03-23', fans: 5100, views: 23000 },
    { date: '03-24', fans: 5150, views: 25000 },
    { date: '03-25', fans: 5200, views: 22000 },
    { date: '03-26', fans: 5234, views: 24000 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto py-12 px-4">
        {/* 页面标题 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            数据分析
          </h1>
          <p className="text-slate-400 text-lg">
            实时监控 IP 数据表现
          </p>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">总粉丝数</span>
                <Badge className="bg-green-600">{stats.growth.fans}</Badge>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalFans.toLocaleString()}</div>
              <p className="text-slate-500 text-xs mt-1">较上周</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">内容总数</span>
                <Badge className="bg-blue-600">48 篇</Badge>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalContent}</div>
              <p className="text-slate-500 text-xs mt-1">累计发布</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">总阅读量</span>
                <Badge className="bg-green-600">{stats.growth.views}</Badge>
              </div>
              <div className="text-3xl font-bold text-white">{(stats.totalViews / 1000).toFixed(1)}K</div>
              <p className="text-slate-500 text-xs mt-1">较上周</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">互动率</span>
                <Badge className="bg-green-600">{stats.growth.engagement}</Badge>
              </div>
              <div className="text-3xl font-bold text-white">{stats.engagementRate}%</div>
              <p className="text-slate-500 text-xs mt-1">较上周</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="growth" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="growth" className="data-[state=active]:bg-blue-600">
              📈 增长趋势
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
              📝 内容分析
            </TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-blue-600">
              👥 受众画像
            </TabsTrigger>
          </TabsList>

          {/* 增长趋势 */}
          <TabsContent value="growth">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">近7天数据趋势</CardTitle>
                <CardDescription className="text-slate-400">
                  粉丝增长和阅读量变化
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* 简单的柱状图 */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-slate-300 text-sm mb-3">粉丝增长（人）</h4>
                    <div className="flex items-end gap-2 h-40">
                      {growthData.map((item, index) => {
                        const maxFans = Math.max(...growthData.map(d => d.fans))
                        const height = (item.fans / maxFans) * 100
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-blue-600 rounded-t hover:bg-blue-500 transition-all cursor-pointer"
                              style={{ height: `${height * 0.8}%` }}
                            />
                            <span className="text-slate-500 text-xs mt-2">{item.date}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-300 text-sm mb-3">阅读量（次）</h4>
                    <div className="flex items-end gap-2 h-40">
                      {growthData.map((item, index) => {
                        const maxViews = Math.max(...growthData.map(d => d.views))
                        const height = (item.views / maxViews) * 100
                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-green-600 rounded-t hover:bg-green-500 transition-all cursor-pointer"
                              style={{ height: `${height * 0.8}%` }}
                            />
                            <span className="text-slate-500 text-xs mt-2">{item.date}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 内容分析 */}
          <TabsContent value="content">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">热门内容排行</CardTitle>
                <CardDescription className="text-slate-400">
                  按阅读量排序的 TOP 内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentData.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={
                              index === 0 ? 'bg-yellow-600' :
                              index === 1 ? 'bg-slate-500' :
                              index === 2 ? 'bg-orange-700' :
                              'bg-slate-700'
                            }>
                              #{index + 1}
                            </Badge>
                            <h4 className="text-white font-semibold">{item.title}</h4>
                          </div>
                          <p className="text-slate-500 text-xs">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <span className="text-slate-400">👁️ {item.views.toLocaleString()} 阅读</span>
                        <span className="text-slate-400">❤️ {item.likes} 点赞</span>
                        <span className="text-slate-400">💬 {item.comments} 评论</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 受众画像 */}
          <TabsContent value="audience">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">受众画像分析</CardTitle>
                <CardDescription className="text-slate-400">
                  粉丝的年龄、性别、地域分布
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* 年龄分布 */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">年龄分布</h4>
                    <div className="space-y-3">
                      {[
                        { label: '18-24岁', percent: 25, color: 'bg-blue-600' },
                        { label: '25-30岁', percent: 40, color: 'bg-purple-600' },
                        { label: '31-35岁', percent: 25, color: 'bg-green-600' },
                        { label: '35岁+', percent: 10, color: 'bg-orange-600' },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{item.label}</span>
                            <span className="text-slate-400">{item.percent}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 性别分布 */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">性别分布</h4>
                    <div className="space-y-3">
                      {[
                        { label: '女性', percent: 65, color: 'bg-pink-600' },
                        { label: '男性', percent: 35, color: 'bg-blue-600' },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{item.label}</span>
                            <span className="text-slate-400">{item.percent}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 地域分布 */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">地域分布（TOP5）</h4>
                    <div className="space-y-3">
                      {[
                        { label: '上海', percent: 22, color: 'bg-blue-600' },
                        { label: '北京', percent: 18, color: 'bg-purple-600' },
                        { label: '深圳', percent: 15, color: 'bg-green-600' },
                        { label: '杭州', percent: 12, color: 'bg-orange-600' },
                        { label: '广州', percent: 10, color: 'bg-yellow-600' },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{item.label}</span>
                            <span className="text-slate-400">{item.percent}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
