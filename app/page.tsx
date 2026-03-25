import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero 区域 */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            IP Architect Hub
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            自媒体 IP 全流程孵化平台
          </p>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            AI 赋能的 IP 孵化工具，从定位调研到内容规划，从智能改写到自动推送，
            全流程助力个人 IP 快速成长
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ip-research">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                开始 IP 调研
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              了解更多
            </Button>
          </div>
        </div>
      </div>

      {/* 功能特性 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          核心功能
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/ip-research">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-blue-500 text-3xl mb-4">🎯</div>
                <h3 className="text-white font-semibold text-lg mb-2">IP 调研</h3>
                <p className="text-slate-400 text-sm">
                  48 题深度调研问卷，AI 生成专业 IP 定位方案
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/operations-plan">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-purple-500 text-3xl mb-4">📋</div>
                <h3 className="text-white font-semibold text-lg mb-2">规划生成</h3>
                <p className="text-slate-400 text-sm">
                  AI 自动生成运营规划书，包含内容策略和行动计划
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/ai-rewrite">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-green-500 text-3xl mb-4">✨</div>
                <h3 className="text-white font-semibold text-lg mb-2">AI 改写</h3>
                <p className="text-slate-400 text-sm">
                  一键改写符合 IP 调性的优质内容
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all">
            <CardContent className="p-6">
              <div className="text-orange-500 text-3xl mb-4">📤</div>
              <h3 className="text-white font-semibold text-lg mb-2">智能推送</h3>
              <p className="text-slate-400 text-sm">
                定时推送内容到飞书、微信等多平台
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 工作流程 */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          工作流程
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[
              { step: '01', title: '深度调研', desc: '完成 48 题调研问卷，让 AI 全面了解你的 IP' },
              { step: '02', title: 'AI 定位', desc: '基于调研结果，AI 生成专属 IP 定位方案' },
              { step: '03', title: '内容规划', desc: 'AI 设计内容支柱、标题库、运营规划' },
              { step: '04', title: '持续创作', desc: 'AI 辅助改写、智能推送，高效产出内容' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <div className="text-5xl font-bold text-slate-800">{item.step}</div>
                <div className="flex-1 pt-2">
                  <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-slate-700 backdrop-blur-sm max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              准备好孵化你的 IP 了吗？
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              从现在开始，让 AI 成为你最得力的 IP 孵化助手
            </p>
            <Link href="/ip-research">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12">
                免费开始使用
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p>© 2026 IP Architect Hub. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
