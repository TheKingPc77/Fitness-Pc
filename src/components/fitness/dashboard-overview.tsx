"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Flame, Target, TrendingUp, Droplet, Moon } from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weightData = [
  { date: "Sem 1", weight: 85 },
  { date: "Sem 2", weight: 84.5 },
  { date: "Sem 3", weight: 83.8 },
  { date: "Sem 4", weight: 83.2 },
  { date: "Sem 5", weight: 82.5 },
  { date: "Sem 6", weight: 82 },
]

const caloriesData = [
  { day: "Seg", consumed: 1800, target: 2000 },
  { day: "Ter", consumed: 2100, target: 2000 },
  { day: "Qua", consumed: 1950, target: 2000 },
  { day: "Qui", consumed: 2050, target: 2000 },
  { day: "Sex", consumed: 1900, target: 2000 },
  { day: "Sáb", consumed: 2200, target: 2000 },
  { day: "Dom", consumed: 2000, target: 2000 },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h2>
        <p className="text-purple-100 text-lg">Você está fazendo um ótimo progresso. Continue assim!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">1,850</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Calorias Hoje</p>
          <Progress value={92} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: 2,000 kcal</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4/5</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Treinos Semana</p>
          <Progress value={80} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: 5 treinos</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">82kg</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Peso Atual</p>
          <Progress value={60} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Meta: 78kg</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">-3kg</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Progresso</p>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-slate-400 mt-2">Últimas 6 semanas</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Evolução de Peso</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[80, 86]} />
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
                stroke="url(#colorWeight)" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Calories Chart */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Calorias Semanais</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="consumed" 
                stroke="#f97316" 
                fill="url(#colorCalories)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">2.1L</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Hidratação Hoje</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">7.5h</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sono Ontem</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">8,542</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Passos Hoje</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
