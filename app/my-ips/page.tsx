'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function MyIPsPage() {
  const [ips, setIps] = useState([
    {
      id: 1,
      name: '职场成长导师',
      niche: '职场技能',
      status: '运营中',
      fans: 5234,
      contentCount: 48,
      createdAt: '2026-03-01',
    },
    {
      id: 2,
      name: '理财小白日记',
      niche: '理财知识',
      status: '规划中',
      fans: 0,
      contentCount: 0,
      createdAt: '2026-03-20',
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newIP, setNewIP] = useState({
    name: '',
    niche: '',
    description: '',
  })

  const handleCreate = () => {
    if (!newIP.name || !newIP.niche) {
      alert('请填写 IP 名称和领域')
      return
    }

    setIps([
      {
        id: Date.now(),
        name: newIP.name,
        niche: newIP.niche,
        status: '规划中',
        fans: 0,
        contentCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      },
      ...ips,
    ])

    setNewIP({ name: '', niche: '', description: '' })
    setShowCreateDialog(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '运营中': return 'bg-green-600'
      case '规划中': return 'bg-blue-600'
      case '已暂停': return 'bg-slate-600'
      default: return 'bg-slate-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              我的 IP
            </h1>
            <p className="text-slate-400 text-lg">
              管理多个 IP 项目，切换查看
            </p>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                + 新建 IP
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800">
              <DialogHeader>
                <DialogTitle className="text-white">创建新 IP</DialogTitle>
                <DialogDescription className="text-slate-400">
                  填写 IP 基本信息，开始孵化之旅
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">IP 名称</Label>
                  <Input
                    id="name"
                    value={newIP.name}
                    onChange={(e) => setNewIP({ ...newIP, name: e.target.value })}
                    placeholder="例如：职场成长导师"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="niche" className="text-slate-300">垂直领域</Label>
                  <Input
                    id="niche"
                    value={newIP.niche}
                    onChange={(e) => setNewIP({ ...newIP, niche: e.target.value })}
                    placeholder="例如：职场技能、理财知识"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300">简短描述</Label>
                  <Textarea
                    id="description"
                    value={newIP.description}
                    onChange={(e) => setNewIP({ ...newIP, description: e.target.value })}
                    placeholder="简单描述这个 IP 的定位..."
                    rows={3}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreate} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    创建 IP
                  </Button>
                  <Button
                    onClick={() => setShowCreateDialog(false)}
                    variant="outline"
                    className="border-slate-700 text-slate-300"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* IP 统计 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">总 IP 数</div>
              <div className="text-3xl font-bold text-white">{ips.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">运营中</div>
              <div className="text-3xl font-bold text-white">
                {ips.filter(ip => ip.status === '运营中').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">总粉丝数</div>
              <div className="text-3xl font-bold text-white">
                {ips.reduce((sum, ip) => sum + ip.fans, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-slate-400 text-sm mb-1">总内容数</div>
              <div className="text-3xl font-bold text-white">
                {ips.reduce((sum, ip) => sum + ip.contentCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* IP 列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ips.map((ip) => (
            <Card key={ip.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-white">{ip.name}</CardTitle>
                  <Badge className={getStatusColor(ip.status)}>
                    {ip.status}
                  </Badge>
                </div>
                <CardDescription className="text-slate-400">
                  {ip.niche}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-500 text-xs">粉丝数</div>
                    <div className="text-white font-semibold">{ip.fans.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">内容数</div>
                    <div className="text-white font-semibold">{ip.contentCount}</div>
                  </div>
                </div>

                <div className="text-slate-500 text-xs">
                  创建于 {ip.createdAt}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    进入
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                    设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 新建 IP 卡片 */}
          <Card className="bg-slate-900/30 border-slate-800 border-dashed hover:bg-slate-900/50 transition-all cursor-pointer" onClick={() => setShowCreateDialog(true)}>
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className="text-4xl mb-4">+</div>
              <div className="text-slate-400 font-medium">创建新 IP</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
