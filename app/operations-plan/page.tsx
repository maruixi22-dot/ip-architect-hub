'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function OperationsPlanPage() {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)

  // 模拟生成规划（实际应该从 IP 调研结果获取）
  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ipName: '示例 IP',
          targetAudience: '职场新人',
          expertise: '职场技能分享',
        }),
      })

      const result = await response.json()
      if (result.success) {
        setPlan(result.data)
      }
    } catch (error) {
      console.error('生成失败:', error)
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
            运营规划生成
          </h1>
          <p className="text-slate-400 text-lg">
            AI 为你生成完整的 IP 孵化运营方案
          </p>
        </div>

        {!plan ? (
          /* 初始状态 */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">生成运营规划</CardTitle>
                <CardDescription className="text-slate-400">
                  基于你的 IP 定位，AI 将生成一份完整的运营规划书
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-500 text-xl">📋</div>
                    <div>
                      <h3 className="text-white font-semibold">内容策略规划</h3>
                      <p className="text-slate-400 text-sm">内容支柱、标题库、更新节奏</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-purple-500 text-xl">📈</div>
                    <div>
                      <h3 className="text-white font-semibold">增长策略制定</h3>
                      <p className="text-slate-400 text-sm">粉丝增长路径、渠道布局</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-green-500 text-xl">💰</div>
                    <div>
                      <h3 className="text-white font-semibold">变现路径设计</h3>
                      <p className="text-slate-400 text-sm">商业模式、产品规划</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-orange-500 text-xl">🎯</div>
                    <div>
                      <h3 className="text-white font-semibold">分阶段行动计划</h3>
                      <p className="text-slate-400 text-sm">1-3月、3-6月、6-12月目标</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'AI 生成中...' : '🚀 开始生成运营规划'}
                </Button>

                <p className="text-slate-500 text-sm text-center">
                  提示：建议先完成 IP 调研，再生成运营规划
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* 规划展示 */
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="bg-slate-900/50 border border-slate-800">
                <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
                  📋 内容策略
                </TabsTrigger>
                <TabsTrigger value="growth" className="data-[state=active]:bg-blue-600">
                  📈 增长策略
                </TabsTrigger>
                <TabsTrigger value="monetization" className="data-[state=active]:bg-blue-600">
                  💰 变现路径
                </TabsTrigger>
                <TabsTrigger value="action" className="data-[state=active]:bg-blue-600">
                  🎯 行动计划
                </TabsTrigger>
              </TabsList>

              {/* 内容策略 */}
              <TabsContent value="content">
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">内容策略规划</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 内容支柱 */}
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">内容支柱</h3>
                      <div className="space-y-3">
                        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-600">主支柱</Badge>
                            <h4 className="text-white font-semibold">{plan.contentStrategy?.mainPillar || '职场技能提升'}</h4>
                          </div>
                          <p className="text-slate-400 text-sm">核心内容方向，占据 60% 内容比例</p>
                        </div>
                        {(plan.contentStrategy?.secondaryPillars || ['职场故事分享', '工具方法推荐']).map((pillar: string, i: number) => (
                          <div key={i} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="border-slate-700 text-slate-300">副支柱 {i + 1}</Badge>
                              <h4 className="text-white font-semibold">{pillar}</h4>
                            </div>
                            <p className="text-slate-400 text-sm">各占 20% 内容比例</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 标题库 */}
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">爆款标题库</h3>
                      <ScrollArea className="h-64 rounded-lg border border-slate-800">
                        <div className="p-4 space-y-2">
                          {(plan.contentStrategy?.titleTemplates || [
                            '我是如何用3年时间从月薪5千到年薪50万的',
                            '职场新人必看：这5个技巧让你的效率翻倍',
                            '后悔知道晚了：工作前3年一定要懂的道理',
                            '90%的人都不知道的职场潜规则',
                            '从普通员工到团队管理者，我只做对了这3件事',
                          ]).map((title: string, i: number) => (
                            <div key={i} className="bg-slate-800/50 rounded p-3 text-slate-300 text-sm">
                              {i + 1}. {title}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* 更新节奏 */}
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">更新节奏</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-2xl mb-2">📝</div>
                          <div className="text-white font-semibold">每周 3-5 篇</div>
                          <div className="text-slate-400 text-sm">深度图文</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-2xl mb-2">🎬</div>
                          <div className="text-white font-semibold">每周 2-3 个</div>
                          <div className="text-slate-400 text-sm">短视频</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-2xl mb-2">💬</div>
                          <div className="text-white font-semibold">每日 1-2 条</div>
                          <div className="text-slate-400 text-sm">动态互动</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 增长策略 */}
              <TabsContent value="growth">
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">增长策略</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">渠道布局</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: '小红书', priority: '核心', desc: '主阵地，深度图文内容' },
                          { name: '抖音', priority: '重要', desc: '短视频，引流转化' },
                          { name: '视频号', priority: '补充', desc: '私域沉淀' },
                          { name: '知乎', priority: '补充', desc: '建立专业形象' },
                        ].map((channel) => (
                          <div key={channel.name} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">{channel.name}</h4>
                              <Badge className={
                                channel.priority === '核心' ? 'bg-blue-600' :
                                channel.priority === '重要' ? 'bg-purple-600' :
                                'bg-slate-700'
                              }>
                                {channel.priority}
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-sm">{channel.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">增长路径</h3>
                      <div className="space-y-4">
                        {[
                          { phase: '阶段一', title: '冷启动期（1-2月）', goal: '积累前 1000 粉丝', actions: ['持续输出优质内容', '参与话题互动', '学习爆款内容规律'] },
                          { phase: '阶段二', title: '增长期（3-6月）', goal: '增长到 10000 粉丝', actions: ['优化内容方向', '增加更新频率', '建立内容矩阵'] },
                          { phase: '阶段三', title: '稳定期（6-12月）', goal: '达到 50000+ 粉丝', actions: ['探索变现模式', '建立个人品牌', '拓展合作资源'] },
                        ].map((stage) => (
                          <div key={stage.phase} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-blue-600">{stage.phase}</Badge>
                              <h4 className="text-white font-semibold">{stage.title}</h4>
                            </div>
                            <p className="text-blue-400 text-sm mb-2">目标：{stage.goal}</p>
                            <ul className="text-slate-400 text-sm space-y-1">
                              {stage.actions.map((action, i) => (
                                <li key={i}>• {action}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 变现路径 */}
              <TabsContent value="monetization">
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">变现路径设计</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">收入模式</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: '广告变现', time: '5000粉', potential: '⭐⭐⭐', desc: '平台广告分成、品牌合作' },
                          { name: '知识付费', time: '10000粉', potential: '⭐⭐⭐⭐⭐', desc: '课程、训练营、咨询' },
                          { name: '带货变现', time: '10000粉', potential: '⭐⭐⭐⭐', desc: '橱窗带货、直播带货' },
                          { name: '私域变现', time: '随时', potential: '⭐⭐⭐⭐⭐', desc: '社群、会员、服务' },
                        ].map((item) => (
                          <div key={item.name} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">{item.name}</h4>
                              <span className="text-yellow-500">{item.potential}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-1">启动门槛：{item.time}</p>
                            <p className="text-slate-500 text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">变现时间线</h3>
                      <div className="space-y-4">
                        {[
                          { period: '1-3月', focus: '专注内容，积累粉丝', revenue: '0 元', actions: '不急于变现，打好基础' },
                          { period: '3-6月', focus: '探索变现模式', revenue: '1000-5000 元/月', actions: '尝试接广告、带货' },
                          { period: '6-12月', focus: '打造变现体系', revenue: '10000-50000 元/月', actions: '开发课程、建立社群' },
                        ].map((item) => (
                          <div key={item.period} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">{item.period}</h4>
                              <Badge className="bg-green-600">{item.revenue}</Badge>
                            </div>
                            <p className="text-slate-300 text-sm mb-1">重点：{item.focus}</p>
                            <p className="text-slate-500 text-sm">{item.actions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 行动计划 */}
              <TabsContent value="action">
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">分阶段行动计划</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        phase: '第一阶段（第1-3月）',
                        title: '基础建设期',
                        goals: ['完成 50+ 篇内容', '积累 1000+ 粉丝', '确定内容风格'],
                        tasks: [
                          '每周更新 3-5 篇内容',
                          '测试不同内容方向',
                          '建立内容发布流程',
                          '学习爆款内容规律',
                          '积累初始粉丝',
                        ],
                      },
                      {
                        phase: '第二阶段（第4-6月）',
                        title: '快速增长期',
                        goals: ['内容质量提升', '粉丝增长到 5000+', '探索变现'],
                        tasks: [
                          '优化内容结构',
                          '增加互动频率',
                          '拓展内容渠道',
                          '尝试商业合作',
                          '建立私域流量',
                        ],
                      },
                      {
                        phase: '第三阶段（第7-12月）',
                        title: '稳定变现期',
                        goals: ['建立个人品牌', '月收入 10000+', '持续增长'],
                        tasks: [
                          '开发付费产品',
                          '建立社群体系',
                          '优化变现模式',
                          '拓展合作资源',
                          '打造品牌影响力',
                        ],
                      },
                    ].map((stage) => (
                      <div key={stage.phase} className="bg-slate-800/50 rounded-lg p-6">
                        <h3 className="text-white font-semibold text-xl mb-2">{stage.phase}</h3>
                        <h4 className="text-blue-400 mb-4">{stage.title}</h4>

                        <div className="mb-4">
                          <h5 className="text-slate-300 font-semibold mb-2">阶段目标</h5>
                          <div className="flex flex-wrap gap-2">
                            {stage.goals.map((goal, i) => (
                              <Badge key={i} variant="outline" className="border-blue-600/50 text-blue-400">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-slate-300 font-semibold mb-2">行动任务</h5>
                          <ul className="space-y-2">
                            {stage.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                                <span className="text-blue-500">✓</span>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 操作按钮 */}
            <div className="flex gap-4 mt-8 justify-center">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                🖨️ 打印规划
              </Button>
              <Button
                onClick={() => setPlan(null)}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                🔄 重新生成
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
