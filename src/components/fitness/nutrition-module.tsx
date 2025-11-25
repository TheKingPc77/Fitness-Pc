"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Plus, Sparkles, Apple, Coffee, UtensilsCrossed } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const dailyMeals = [
  { id: 1, name: "Café da Manhã", time: "08:00", calories: 450, protein: 25, carbs: 55, fat: 12, icon: Coffee },
  { id: 2, name: "Almoço", time: "12:30", calories: 680, protein: 45, carbs: 75, fat: 18, icon: UtensilsCrossed },
  { id: 3, name: "Lanche", time: "16:00", calories: 220, protein: 12, carbs: 28, fat: 8, icon: Apple },
  { id: 4, name: "Jantar", time: "19:30", calories: 520, protein: 38, carbs: 48, fat: 15, icon: UtensilsCrossed },
]

const macrosData = [
  { name: "Proteínas", value: 120, color: "#8b5cf6" },
  { name: "Carboidratos", value: 206, color: "#ec4899" },
  { name: "Gorduras", value: 53, color: "#f97316" },
]

const weeklyCalories = [
  { day: "Seg", calories: 1850 },
  { day: "Ter", calories: 2100 },
  { day: "Qua", calories: 1950 },
  { day: "Qui", calories: 2050 },
  { day: "Sex", calories: 1900 },
  { day: "Sáb", calories: 2200 },
  { day: "Dom", calories: 2000 },
]

export default function NutritionModule() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setAnalyzing(true)
        
        // Simular análise de IA
        setTimeout(() => {
          setAnalyzing(false)
          setAnalysisResult({
            food: "Frango Grelhado com Arroz Integral e Brócolis",
            calories: 520,
            protein: 45,
            carbs: 52,
            fat: 12,
            observations: "Refeição balanceada e saudável! Rica em proteínas e fibras. Perfeita para ganho muscular."
          })
        }, 2500)
      }
      reader.readAsDataURL(file)
    }
  }

  const totalCalories = dailyMeals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = 2000
  const calorieProgress = (totalCalories / calorieGoal) * 100

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">FitCal - Análise Nutricional</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Identifique alimentos e conte calorias com IA</p>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200 dark:border-orange-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Calorias Hoje</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalCalories}</p>
          <p className="text-xs text-slate-500 mt-1">Meta: {calorieGoal} kcal</p>
          <div className="mt-3 h-2 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Proteínas</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">120g</p>
          <p className="text-xs text-slate-500 mt-1">Meta: 150g</p>
          <div className="mt-3 h-2 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 w-[80%]" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Carboidratos</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">206g</p>
          <p className="text-xs text-slate-500 mt-1">Meta: 200g</p>
          <div className="mt-3 h-2 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 w-[100%]" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Gorduras</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">53g</p>
          <p className="text-xs text-slate-500 mt-1">Meta: 60g</p>
          <div className="mt-3 h-2 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-[88%]" />
          </div>
        </Card>
      </div>

      {/* Food Analysis Upload */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Analise sua Refeição</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Tire uma foto e a IA identificará os alimentos e nutrientes</p>
          
          <label htmlFor="food-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Camera className="w-5 h-5" />
              Fotografar Refeição
            </div>
            <input
              id="food-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {selectedImage && (
          <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl">
            <img src={selectedImage} alt="Food" className="w-full max-w-md mx-auto rounded-xl shadow-lg" />
            
            {analyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">IA analisando sua refeição...</span>
                </div>
              </div>
            )}

            {analysisResult && !analyzing && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white">{analysisResult.food}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Calorias</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{analysisResult.calories}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Proteínas</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{analysisResult.protein}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Carboidratos</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{analysisResult.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Gorduras</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{analysisResult.fat}g</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {analysisResult.observations}
                </p>
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar ao Diário
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calories */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Calorias Semanais</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyCalories}>
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
              <Bar dataKey="calories" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Macros Distribution */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Distribuição de Macros</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={macrosData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {macrosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Meals Log */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Diário Alimentar</h3>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-4">
          {dailyMeals.map((meal) => {
            const Icon = meal.icon
            return (
              <div key={meal.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{meal.name}</h4>
                    <span className="text-sm text-slate-500">{meal.time}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <span>{meal.calories} kcal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
