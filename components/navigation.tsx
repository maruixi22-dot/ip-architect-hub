'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: '仪表板', icon: '🏠' },
    { href: '/my-ips', label: '我的 IP', icon: '🎯' },
    { href: '/content-collect', label: '内容采集', icon: '📥' },
    { href: '/ai-rewrite', label: 'AI 改写', icon: '✨' },
    { href: '/push', label: '内容推送', icon: '📤' },
    { href: '/analytics', label: '数据分析', icon: '📊' },
  ]

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-lg">IP Architect Hub</span>
          </Link>

          {/* 导航链接 */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* 右侧状态 */}
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-green-600/50 text-green-400">
              ● 运行中
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  )
}
