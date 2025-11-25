"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, TrendingUp, Calendar, Download, Sparkles } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

const progressData = [
  { month: "Jan", weight: 85, bodyFat: 22 },
  { month: "Fev", weight: 84, bodyFat: 21 },
  { month: "Mar", weight: 83, bodyFat: 20 },
  { month: "Abr", weight: 82.5, bodyFat: 19.5 },
  { month: "Mai", weight: 82, bodyFat: 19 },
]

const bodyMetrics = [
  { metric: "Braços", value: 85, fullMark: 100 },
  { metric: "Peito", value: 75, fullMark: 100 },
  { metric: "Costas", value: 80, fullMark: 100 },
  { metric: "Abdômen", value: 65, fullMark: 100 },
  { metric: "Pernas", value: 90, fullMark: 100 },
]

export default function ProgressModule() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setAnalyzing(true)
        setTimeout(() => setAnalyzing(false), 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Análise de Progresso</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Acompanhe sua evolução física com IA</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg">
          <Download className="w-4 h-4 mr-2" />
          Relatório
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Envie sua Foto de Progresso</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">A IA analisará sua evolução física e gerará insights personalizados</p>
          
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Upload className="w-5 h-5" />
              Fazer Upload de Foto
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {selectedImage && (
          <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl">
            <img src={selectedImage} alt="Progress" className="w-full max-w-md mx-auto rounded-xl shadow-lg" />
            {analyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">IA analisando sua foto...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* AI Feedback */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Feedback Motivacional da IA</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              🎉 <strong>Excelente progresso!</strong> Você perdeu 3kg nos últimos 2 meses e sua composição corporal melhorou significativamente. 
              Sua definição muscular está aumentando, especialmente na região do abdômen e braços. Continue com o treino de força 
              e mantenha a consistência na dieta. Você está no caminho certo para atingir sua meta!
            </p>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight & Body Fat Progress */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Evolução de Peso e Gordura
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Peso (kg)"
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="bodyFat" 
                stroke="#ec4899" 
                strokeWidth={3}
                name="Gordura (%)"
                dot={{ fill: '#ec4899', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Body Metrics Radar */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            Análise Corporal por Região
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={bodyMetrics}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar 
                name="Desenvolvimento" 
                dataKey="value" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          Histórico de Fotos
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Camera className="w-8 h-8" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                <span className="text-white font-medium">Mês {i}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Peso Perdido</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">-3.0 kg</p>
          <Progress value={60} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: -5kg</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Gordura Reduzida</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">-3.0%</p>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: -4%</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Massa Muscular</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">+1.5 kg</p>
          <Progress value={50} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: +3kg</p>
        </Card>
      </div>
    </div>
  )
}
