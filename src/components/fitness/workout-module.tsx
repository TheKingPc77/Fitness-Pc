"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Dumbbell, Clock, Flame, Target, ChevronRight, Sparkles, Zap } from "lucide-react"

const todayWorkout = {
  name: "Treino de Peito e Tríceps",
  duration: "45 min",
  calories: 380,
  difficulty: "Intermediário",
  exercises: [
    {
      id: 1,
      name: "Supino Reto com Barra",
      sets: 4,
      reps: "10-12",
      rest: "90s",
      videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
      tips: ["Mantenha os pés firmes no chão", "Desça a barra até o peito", "Expire ao subir a barra"]
    },
    {
      id: 2,
      name: "Supino Inclinado com Halteres",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
      tips: ["Inclinação de 30-45 graus", "Movimento controlado", "Foco na parte superior do peito"]
    },
    {
      id: 3,
      name: "Crucifixo com Halteres",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      videoUrl: "https://www.youtube.com/embed/eozdVDA78K0",
      tips: ["Cotovelos levemente flexionados", "Alongue bem o peito", "Controle o movimento"]
    },
    {
      id: 4,
      name: "Tríceps Testa com Barra",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      videoUrl: "https://www.youtube.com/embed/d_KZxkY_0cM",
      tips: ["Cotovelos fixos", "Movimento apenas do antebraço", "Controle na descida"]
    },
    {
      id: 5,
      name: "Tríceps Corda na Polia",
      sets: 3,
      reps: "15-20",
      rest: "45s",
      videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU",
      tips: ["Abra a corda no final", "Cotovelos junto ao corpo", "Contração máxima"]
    }
  ]
}

const weeklyPlan = [
  { day: "Segunda", focus: "Peito e Tríceps", status: "completed" },
  { day: "Terça", focus: "Costas e Bíceps", status: "completed" },
  { day: "Quarta", focus: "Pernas", status: "completed" },
  { day: "Quinta", focus: "Ombros e Abdômen", status: "today" },
  { day: "Sexta", focus: "Treino Full Body", status: "pending" },
  { day: "Sábado", focus: "Cardio HIIT", status: "pending" },
  { day: "Domingo", focus: "Descanso Ativo", status: "pending" },
]

export default function WorkoutModule() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(0)

  // Timer funcional com useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isPlaying && activeExercise !== null) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else if (!isPlaying && interval) {
      clearInterval(interval)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, activeExercise])

  const startWorkout = (exerciseId: number) => {
    if (activeExercise === exerciseId) {
      // Se já está ativo, apenas pausa/resume
      setIsPlaying(!isPlaying)
    } else {
      // Inicia novo exercício
      setActiveExercise(exerciseId)
      setIsPlaying(true)
      setTimer(0)
    }
  }

  const resetTimer = () => {
    setTimer(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Treinos Inteligentes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Treinos personalizados criados por IA</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
          <Zap className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Today's Workout Card - Design Moderno */}
      <Card className="p-6 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className="bg-white/30 backdrop-blur-sm text-white border-0 mb-3 shadow-lg">
              🔥 Treino de Hoje
            </Badge>
            <h3 className="text-2xl font-bold mb-2">{todayWorkout.name}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                {todayWorkout.duration}
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Flame className="w-4 h-4" />
                {todayWorkout.calories} kcal
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Target className="w-4 h-4" />
                {todayWorkout.difficulty}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <Dumbbell className="w-8 h-8" />
          </div>
        </div>
        <Button 
          className="w-full bg-white text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:bg-white/90 font-bold shadow-2xl text-lg py-6 hover:scale-105 transition-all duration-300"
          size="lg"
          onClick={() => startWorkout(todayWorkout.exercises[0].id)}
        >
          <Play className="w-6 h-6 mr-2 text-orange-500" />
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold">
            Iniciar Treino Agora
          </span>
        </Button>
      </Card>

      {/* Weekly Plan - Design Aprimorado */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          Plano Semanal
        </h3>
        <div className="space-y-2">
          {weeklyPlan.map((day, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer hover:scale-[1.02] ${
                day.status === 'today' 
                  ? 'bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-purple-950/30 border-2 border-orange-300 dark:border-orange-700 shadow-lg' 
                  : day.status === 'completed'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-300 dark:border-green-700'
                  : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  day.status === 'today'
                    ? 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600'
                    : day.status === 'completed'
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                    : 'bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700'
                }`}>
                  <Dumbbell className={`w-5 h-5 ${day.status === 'pending' ? 'text-slate-600 dark:text-slate-400' : 'text-white'}`} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{day.day}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{day.focus}</p>
                </div>
              </div>
              {day.status === 'today' && (
                <Badge className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-0 shadow-lg">
                  🎯 Hoje
                </Badge>
              )}
              {day.status === 'completed' && (
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">
                  ✓ Concluído
                </Badge>
              )}
              {day.status === 'pending' && (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Exercise List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-orange-500" />
          Exercícios do Treino
        </h3>
        {todayWorkout.exercises.map((exercise, index) => (
          <Card 
            key={exercise.id}
            className={`overflow-hidden transition-all duration-300 hover:shadow-2xl ${
              activeExercise === exercise.id 
                ? 'ring-2 ring-orange-500 shadow-2xl scale-[1.02]' 
                : 'border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{exercise.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="bg-orange-100 dark:bg-orange-950/30 px-2 py-1 rounded-lg">{exercise.sets} séries</span>
                      <span>•</span>
                      <span className="bg-pink-100 dark:bg-pink-950/30 px-2 py-1 rounded-lg">{exercise.reps} reps</span>
                      <span>•</span>
                      <span className="bg-purple-100 dark:bg-purple-950/30 px-2 py-1 rounded-lg">Descanso: {exercise.rest}</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={activeExercise === exercise.id ? "default" : "outline"}
                  className={`${
                    activeExercise === exercise.id 
                      ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl" 
                      : "hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-300"
                  } transition-all duration-300`}
                  onClick={() => startWorkout(exercise.id)}
                >
                  {activeExercise === exercise.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </>
                  )}
                </Button>
              </div>

              {activeExercise === exercise.id && (
                <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                  {/* Video Player */}
                  <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl ring-2 ring-orange-500/50">
                    <iframe
                      width="100%"
                      height="100%"
                      src={exercise.videoUrl}
                      title={exercise.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  {/* Timer - Funcional */}
                  <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-purple-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800 shadow-lg">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={resetTimer}
                      className="hover:bg-white dark:hover:bg-slate-800 hover:border-orange-300"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <div className="text-center">
                      <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Tempo de treino</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-300 dark:border-green-700 shadow-lg">
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-500" />
                      Dicas de Execução
                    </h5>
                    <ul className="space-y-2">
                      {exercise.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5 font-bold">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950/30 dark:via-cyan-950/30 dark:to-teal-950/30 border-2 border-blue-300 dark:border-blue-700 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              🤖 Recomendações da IA
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Com base no seu progresso, recomendamos aumentar a carga em 5% no supino reto na próxima semana. 
              Você está evoluindo bem! Continue focando na técnica e no tempo sob tensão para maximizar os ganhos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
