"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Sparkles, Apple, Coffee, UtensilsCrossed, Droplet, CheckCircle2, AlertCircle } from "lucide-react"

const dietPlan = {
  goal: "Perda de Gordura",
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 60,
  meals: [
    {
      id: 1,
      name: "Café da Manhã",
      time: "07:00 - 08:00",
      icon: Coffee,
      foods: [
        "3 ovos mexidos",
        "2 fatias de pão integral",
        "1 banana",
        "Café com leite desnatado"
      ],
      calories: 450,
      protein: 28,
      carbs: 52,
      fat: 14
    },
    {
      id: 2,
      name: "Lanche da Manhã",
      time: "10:00 - 10:30",
      icon: Apple,
      foods: [
        "1 iogurte grego natural",
        "30g de granola",
        "1 maçã"
      ],
      calories: 280,
      protein: 18,
      carbs: 38,
      fat: 8
    },
    {
      id: 3,
      name: "Almoço",
      time: "12:30 - 13:30",
      icon: UtensilsCrossed,
      foods: [
        "150g de frango grelhado",
        "1 xícara de arroz integral",
        "Salada verde à vontade",
        "Brócolis no vapor"
      ],
      calories: 580,
      protein: 48,
      carbs: 62,
      fat: 12
    },
    {
      id: 4,
      name: "Lanche da Tarde",
      time: "16:00 - 16:30",
      icon: Apple,
      foods: [
        "Shake de whey protein",
        "1 banana",
        "1 colher de pasta de amendoim"
      ],
      calories: 320,
      protein: 32,
      carbs: 28,
      fat: 12
    },
    {
      id: 5,
      name: "Jantar",
      time: "19:30 - 20:30",
      icon: UtensilsCrossed,
      foods: [
        "150g de salmão grelhado",
        "Batata doce assada (200g)",
        "Aspargos grelhados",
        "Salada verde"
      ],
      calories: 520,
      protein: 42,
      carbs: 48,
      fat: 16
    }
  ]
}

const hydrationGoal = 3000 // ml
const currentHydration = 2100 // ml

export default function DietPlanModule() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [mealCheck, setMealCheck] = useState<any>(null)

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
          setMealCheck({
            compatible: true,
            foods: ["Frango grelhado", "Arroz integral", "Brócolis"],
            calories: 580,
            protein: 48,
            carbs: 62,
            fat: 12,
            feedback: "✅ Refeição perfeitamente alinhada com seu plano! Excelente escolha de proteína magra e carboidratos complexos.",
            adjustments: []
          })
        }, 2500)
      }
      reader.readAsDataURL(file)
    }
  }

  const hydrationPercentage = (currentHydration / hydrationGoal) * 100

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Plano Alimentar IA</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Dieta personalizada e inteligente</p>
      </div>

      {/* Diet Summary */}
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge className="bg-white/20 text-white border-0 mb-3">Seu Plano Atual</Badge>
            <h3 className="text-2xl font-bold mb-2">{dietPlan.goal}</h3>
            <p className="text-purple-100">Plano otimizado pela IA para seus objetivos</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-purple-100 mb-1">Calorias</p>
            <p className="text-2xl font-bold">{dietPlan.calories}</p>
            <p className="text-xs text-purple-200">kcal/dia</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-purple-100 mb-1">Proteínas</p>
            <p className="text-2xl font-bold">{dietPlan.protein}g</p>
            <p className="text-xs text-purple-200">por dia</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-purple-100 mb-1">Carboidratos</p>
            <p className="text-2xl font-bold">{dietPlan.carbs}g</p>
            <p className="text-xs text-purple-200">por dia</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-purple-100 mb-1">Gorduras</p>
            <p className="text-2xl font-bold">{dietPlan.fat}g</p>
            <p className="text-xs text-purple-200">por dia</p>
          </div>
        </div>
      </Card>

      {/* Meal Verification */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-xl">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Verificar Compatibilidade</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Envie foto da refeição e a IA verificará se está alinhada com seu plano</p>
          
          <label htmlFor="meal-check-upload" className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Camera className="w-5 h-5" />
              Verificar Refeição
            </div>
            <input
              id="meal-check-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {selectedImage && (
          <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl">
            <img src={selectedImage} alt="Meal Check" className="w-full max-w-md mx-auto rounded-xl shadow-lg" />
            
            {analyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">IA verificando compatibilidade...</span>
                </div>
              </div>
            )}

            {mealCheck && !analyzing && (
              <div className={`mt-6 p-6 rounded-xl border ${
                mealCheck.compatible 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800'
                  : 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200 dark:border-orange-800'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  {mealCheck.compatible ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                      {mealCheck.compatible ? "Refeição Aprovada!" : "Atenção Necessária"}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{mealCheck.feedback}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Calorias</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{mealCheck.calories}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Proteínas</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{mealCheck.protein}g</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Carboidratos</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{mealCheck.carbs}g</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Gorduras</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{mealCheck.fat}g</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Alimentos Identificados:</p>
                  <div className="flex flex-wrap gap-2">
                    {mealCheck.foods.map((food: string, i: number) => (
                      <Badge key={i} variant="secondary">{food}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Hydration Tracker */}
      <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200 dark:border-cyan-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Meta de Hidratação</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{currentHydration}ml de {hydrationGoal}ml</p>
            </div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
            + 250ml
          </Button>
        </div>
        <div className="h-4 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
            style={{ width: `${hydrationPercentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">{Math.round(hydrationPercentage)}% da meta diária</p>
      </Card>

      {/* Meal Plan */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Refeições do Dia</h3>
        {dietPlan.meals.map((meal) => {
          const Icon = meal.icon
          return (
            <Card key={meal.id} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{meal.name}</h4>
                    <Badge variant="outline">{meal.time}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <span>{meal.calories} kcal</span>
                    <span>•</span>
                    <span>P: {meal.protein}g</span>
                    <span>•</span>
                    <span>C: {meal.carbs}g</span>
                    <span>•</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Alimentos:</p>
                <ul className="space-y-2">
                  {meal.foods.map((food, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
                      {food}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>

      {/* AI Suggestions */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Sugestões Inteligentes</h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Considere adicionar mais vegetais verdes no almoço para aumentar a ingestão de fibras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Seu consumo de proteína está ótimo! Continue assim para manter a massa muscular</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Tente beber mais água pela manhã para melhorar a hidratação ao longo do dia</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
