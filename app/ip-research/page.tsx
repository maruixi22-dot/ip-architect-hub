'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function IPResearchPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // 模块 1: IP 背景洞察
    name: '',
    age: '',
    profession: '',
    experience: '',

    // 模块 2: 受众与市场洞察
    targetAudience: '',
    audiencePainPoint: '',
    marketPosition: '',

    // 模块 3: IP 独特性
    uniqueValue: '',
    personalStory: '',
    expertise: '',

    // 模块 4: 核心价值交付
    valueProposition: '',
    contentTypes: [],
    contentFrequency: '',

    // 模块 5: 内容方向构建
    contentPillars: [],
    tone: '',
    goals: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate/positioning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      // TODO: 处理生成结果
      console.log(result)
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
            IP 深度调研
          </h1>
          <p className="text-slate-400 text-lg">
            回答关键问题，AI 将为你生成专属 IP 定位方案
          </p>
        </div>

        {/* 进度指示 */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center ${
                  step < 5 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step
                        ? 'bg-blue-600'
                        : 'bg-slate-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 问卷内容 */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                {currentStep === 1 && 'IP 背景洞察'}
                {currentStep === 2 && '受众与市场洞察'}
                {currentStep === 3 && 'IP 独特性'}
                {currentStep === 4 && '核心价值交付'}
                {currentStep === 5 && '内容方向构建'}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {currentStep === 1 && '了解你的背景和资源'}
                {currentStep === 2 && '明确目标受众和市场竞争'}
                {currentStep === 3 && '挖掘你的独特价值'}
                {currentStep === 4 && '定义你能提供的核心价值'}
                {currentStep === 5 && '规划内容方向和风格'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div>
                    <Label htmlFor="name" className="text-slate-300">你的名字</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="请输入你的名字"
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profession" className="text-slate-300">你的职业/身份</Label>
                    <Input
                      id="profession"
                      value={formData.profession}
                      onChange={(e) => handleInputChange('profession', e.target.value)}
                      placeholder="例如：产品经理、律师、健身教练..."
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-slate-300">从业经验</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="简单介绍你的从业经历和主要成就..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <Label htmlFor="targetAudience" className="text-slate-300">目标受众是谁？</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="描述你想吸引的人群特征、年龄、职业、兴趣..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="audiencePainPoint" className="text-slate-300">他们有什么痛点？</Label>
                    <Textarea
                      id="audiencePainPoint"
                      value={formData.audiencePainPoint}
                      onChange={(e) => handleInputChange('audiencePainPoint', e.target.value)}
                      placeholder="目标受众面临的主要问题和困惑..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <Label htmlFor="uniqueValue" className="text-slate-300">你的独特价值是什么？</Label>
                    <Textarea
                      id="uniqueValue"
                      value={formData.uniqueValue}
                      onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                      placeholder="与同领域其他人相比，你有什么不同..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personalStory" className="text-slate-300">你的个人故事</Label>
                    <Textarea
                      id="personalStory"
                      value={formData.personalStory}
                      onChange={(e) => handleInputChange('personalStory', e.target.value)}
                      placeholder="分享你的经历、转折点、成长故事..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div>
                    <Label htmlFor="valueProposition" className="text-slate-300">你能提供的核心价值</Label>
                    <Textarea
                      id="valueProposition"
                      value={formData.valueProposition}
                      onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                      placeholder="你的内容能为受众带来什么具体价值..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contentFrequency" className="text-slate-300">更新频率</Label>
                    <Input
                      id="contentFrequency"
                      value={formData.contentFrequency}
                      onChange={(e) => handleInputChange('contentFrequency', e.target.value)}
                      placeholder="例如：每周3篇、每天1条..."
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <div>
                    <Label htmlFor="tone" className="text-slate-300">希望的内容风格</Label>
                    <Textarea
                      id="tone"
                      value={formData.tone}
                      onChange={(e) => handleInputChange('tone', e.target.value)}
                      placeholder="例如：专业严谨、轻松幽默、温暖治愈..."
                      rows={3}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-slate-300">IP 孵化目标</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="你希望通过 IP 实现什么目标？例如：粉丝增长、变现转化、品牌影响力..."
                      rows={4}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </>
              )}

              {/* 导航按钮 */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  上一步
                </Button>

                {currentStep < 5 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    下一步
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? '生成中...' : '生成 IP 定位方案'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
