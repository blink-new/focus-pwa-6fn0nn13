import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MonadSymbol } from "./MonadSymbol"

interface HeroJourneyDashboardProps {
  heroName: string
  onStartFocus: () => void
  onViewProgress: () => void
  onViewWisdom: () => void
}

const journeyStages = [
  { 
    name: "The Call", 
    description: "Awakening to the need for focus",
    completed: true,
    icon: "🌅"
  },
  { 
    name: "First Steps", 
    description: "Learning the fundamentals",
    completed: false,
    icon: "👣"
  },
  { 
    name: "The Challenge", 
    description: "Overcoming distractions",
    completed: false,
    icon: "⚔️"
  },
  { 
    name: "Deep Work", 
    description: "Sustained focus mastery",
    completed: false,
    icon: "🧘"
  },
  { 
    name: "The Return", 
    description: "Sharing wisdom with others",
    completed: false,
    icon: "🏆"
  }
]

export function HeroJourneyDashboard({ 
  heroName, 
  onStartFocus, 
  onViewProgress, 
  onViewWisdom 
}: HeroJourneyDashboardProps) {
  const [currentStage] = useState(0)
  const progressPercentage = ((currentStage + 1) / journeyStages.length) * 100

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header with Settings */}
        <div className="flex justify-between items-center">
          <div className="w-8" />
          <h1 className="text-xl font-medium text-black">Focus Journey</h1>
          <Button 
            variant="ghost" 
            onClick={onViewSettings}
            className="text-gray-600 hover:text-black p-2"
          >
            ⚙️
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4 hero-fade-in">
          <MonadSymbol 
            size={80} 
            pulse={true}
            className="mx-auto"
          />
          <div className="space-y-2">
            <h2 className="text-3xl font-light text-black">
              Welcome, {heroName}
            </h2>
            <p className="text-gray-600 font-light">
              {userData.sessionsCompleted === 0 
                ? "Your journey to focus mastery begins"
                : `${userData.sessionsCompleted} sessions completed • Stage ${currentStage + 1} of 5`
              }
            </p>
          </div>
        </div>

        {/* Journey Progress */}
        <Card className="p-6 border-gray-200 hero-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-black">Hero's Journey</h2>
              <span className="text-sm text-gray-500">
                Stage {currentStage + 1} of {journeyStages.length}
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="space-y-3">
              {journeyStages.map((stage, index) => (
                <div 
                  key={stage.name}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    index === currentStage 
                      ? 'bg-gray-50 border border-gray-200' 
                      : index < currentStage 
                        ? 'opacity-60' 
                        : 'opacity-40'
                  }`}
                >
                  <span className="text-xl">{stage.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-black">{stage.name}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                  {stage.completed && (
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Cards */}
        <div className="grid gap-4 hero-slide-up" style={{ animationDelay: "0.4s" }}>
          
          {/* Start Focus Session */}
          <Card 
            className="p-6 border-gray-200 hover:border-black transition-all cursor-pointer group"
            onClick={onStartFocus}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Begin Focus Session</h3>
                <p className="text-sm text-gray-600">Start your practice with guided focus</p>
              </div>
              <span className="text-gray-400 group-hover:text-black transition-colors">→</span>
            </div>
          </Card>

          {/* View Progress */}
          <Card 
            className="p-6 border-gray-200 hover:border-black transition-all cursor-pointer group"
            onClick={onViewProgress}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-black text-xl">📊</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Track Progress</h3>
                <p className="text-sm text-gray-600">View your focus journey analytics</p>
              </div>
              <span className="text-gray-400 group-hover:text-black transition-colors">→</span>
            </div>
          </Card>

          {/* Wisdom Library */}
          <Card 
            className="p-6 border-gray-200 hover:border-black transition-all cursor-pointer group"
            onClick={onViewWisdom}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-black text-xl">📚</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">Wisdom Library</h3>
                <p className="text-sm text-gray-600">Learn from masters of focus</p>
              </div>
              <span className="text-gray-400 group-hover:text-black transition-colors">→</span>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        {userData.sessionsCompleted > 0 && (
          <div className="grid grid-cols-3 gap-4 hero-slide-up" style={{ animationDelay: "0.5s" }}>
            <Card className="p-4 text-center border-gray-200">
              <div className="text-2xl font-light text-black">{userData.totalFocusTime}m</div>
              <div className="text-xs text-gray-600">Total Focus</div>
            </Card>
            <Card className="p-4 text-center border-gray-200">
              <div className="text-2xl font-light text-black">{userData.averageSessionLength}m</div>
              <div className="text-xs text-gray-600">Avg Session</div>
            </Card>
            <Card className="p-4 text-center border-gray-200">
              <div className="text-2xl font-light text-black">{userData.achievements.length}</div>
              <div className="text-xs text-gray-600">Achievements</div>
            </Card>
          </div>
        )}

        {/* Daily Quote */}
        <Card className="p-6 border-gray-200 text-center hero-slide-up" style={{ animationDelay: "0.6s" }}>
          <blockquote className="text-lg font-light text-gray-700 italic">
            "The successful warrior is the average person with laser-like focus."
          </blockquote>
          <cite className="text-sm text-gray-500 mt-2 block">— Bruce Lee</cite>
        </Card>
      </div>
    </div>
  )
}