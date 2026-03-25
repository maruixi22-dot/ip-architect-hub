import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const quickActions = [
    {
      title: 'IP 调研',
      description: '48 题深度调研，AI 生成定位方案',
      icon: '🎯',
      href: '/ip-research',
      color: 'from-blue-600/20 to-blue-800/20 border-blue-600/30',
    },
    {
      title: 'AI 改写',
      description: '智能改写内容，一键生成爆款文案',
      icon: '✨',
      href: '/ai-rewrite',
      color: 'from-green-600/20 to-green-800/20 border-green-600/30',
    },
    {
      title: '运营规划',
      description: 'AI 生成完整运营规划方案',
      icon: '📋',
      href: '/operations-plan',
      color: 'from-purple-600/20 to-purple-800/20 border-purple-600/30',
    },
    {
      title: '内容推送',
      description: '一键推送内容到飞书等多平台',
      icon: '📤',
      href: '/push',
      color: 'from-orange-600/20 to-orange-800/20 border-orange-600/30',
    },
  ]

  const stats = [
    { label: '总浏览量', value: '125.4K', change: '+28.3%', positive: true },
    { label: '粉丝数', value: '5,234', change: '+12.5%', positive: true },
    { label: '内容数', value: '48', change: '+6', positive: true },
    { label: '互动率', value: '8.5%', change: '+2.1%', positive: true },
  ]

  const recentActivity = [
    { action: '发布了新内容', title: '职场新人必看的5个效率技巧', time: '2小时前' },
    { action: 'AI 改写了内容', title: '如何用3年时间实现...', time: '5小时前' },
    { action: '推送到飞书', title: '今日内容推荐', time: '昨天 18:00' },
    { action: '生成了规划', title: 'IP 运营规划方案', time: '昨天 10:00' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 欢迎横幅 */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            欢迎回来 👋
          </h1>
          <p className="text-slate-400">
            今天也是孵化 IP 的一天，开始创作吧！
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 核心指标 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                  <Badge className={stat.positive ? 'bg-green-600' : 'bg-red-600'}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 快捷操作 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">快捷操作</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className={`bg-gradient-to-br ${action.color} border backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer h-full`}>
                  <CardHeader>
                    <div className="text-4xl mb-2">{action.icon}</div>
                    <CardTitle className="text-white">{action.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 最近活动 */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">最近活动</CardTitle>
                <CardDescription className="text-slate-400">
                  你的最新操作记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl">
                        {index === 0 ? '✍️' : index === 1 ? '✨' : index === 2 ? '📤' : '📋'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {activity.action}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {activity.title}
                        </p>
                      </div>
                      <span className="text-slate-500 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 快速提示 */}
          <div>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">💡 小贴士</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    完成调研后，可以使用运营规划功能生成完整的孵化方案
                  </p>
                </div>
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    AI 改写支持 5 种风格，试试不同的风格效果
                  </p>
                </div>
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    设置定时推送，让内容自动发送到飞书
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 开始使用 CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              准备好了吗？
            </h2>
            <p className="text-slate-300 mb-6">
              开始你的 IP 孵化之旅，让 AI 成为你最得力的助手
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/ip-research">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  开始 IP 调研
                </Button>
              </Link>
              <Link href="/analytics">
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  查看数据
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
