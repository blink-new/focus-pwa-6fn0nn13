import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MonadSymbol } from "./MonadSymbol"

interface FocusTrainingProps {
  heroName: string
  onBack: () => void
  onComplete: (duration: number) => void
}

type SessionState = 'setup' | 'breathing' | 'focusing' | 'paused' | 'completed'

export function FocusTraining({ heroName, onBack, onComplete }: FocusTrainingProps) {
  const [sessionState, setSessionState] = useState<SessionState>('setup')
  const [selectedDuration, setSelectedDuration] = useState(5) // minutes
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathingCount, setBreathingCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const durations = [
    { minutes: 5, label: "5 min", description: "Quick focus" },
    { minutes: 15, label: "15 min", description: "Deep work" },
    { minutes: 25, label: "25 min", description: "Pomodoro" },
    { minutes: 45, label: "45 min", description: "Extended focus" }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startBreathing = () => {
    setSessionState('breathing')
    setBreathingCount(0)
    
    const breathingCycle = () => {
      setBreathingPhase('inhale')
      setTimeout(() => setBreathingPhase('hold'), 4000)
      setTimeout(() => setBreathingPhase('exhale'), 8000)
    }
    
    breathingCycle()
    breathingIntervalRef.current = setInterval(breathingCycle, 12000)
    
    // After 1 minute of breathing, start focus session
    setTimeout(() => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current)
      }
      startFocusSession()
    }, 60000)
  }

  const startFocusSession = () => {
    setSessionState('focusing')
    setTimeRemaining(selectedDuration * 60)
    
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setSessionState('paused')
  }

  const resumeSession = () => {
    setSessionState('focusing')
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const completeSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setSessionState('completed')
    onComplete(selectedDuration)
  }

  const resetSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current)
      breathingIntervalRef.current = null
    }
    setSessionState('setup')
    setTimeRemaining(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current)
      }
    }
  }, [])

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in slowly...'
      case 'hold': return 'Hold your breath...'
      case 'exhale': return 'Breathe out slowly...'
    }
  }

  const getMonadAnimation = () => {
    if (sessionState === 'breathing') {
      return breathingPhase === 'inhale' || breathingPhase === 'hold'
    }
    return sessionState === 'focusing'
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-lg mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-600 hover:text-black"
          >
            ← Back
          </Button>
          <h1 className="text-xl font-medium text-black">Focus Training</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Setup State */}
        {sessionState === 'setup' && (
          <div className="space-y-8 hero-fade-in">
            <div className="text-center space-y-4">
              <MonadSymbol size={120} pulse={true} className="mx-auto" />
              <div>
                <h2 className="text-2xl font-light text-black">Ready, {heroName}?</h2>
                <p className="text-gray-600 mt-2">Choose your focus duration</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {durations.map((duration) => (
                <Card
                  key={duration.minutes}
                  className={`p-4 cursor-pointer transition-all border-2 ${
                    selectedDuration === duration.minutes
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDuration(duration.minutes)}
                >
                  <div className="text-center">
                    <div className="text-lg font-medium">{duration.label}</div>
                    <div className="text-sm opacity-70">{duration.description}</div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              onClick={startBreathing}
              className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white"
            >
              Begin Session
            </Button>
          </div>
        )}

        {/* Breathing State */}
        {sessionState === 'breathing' && (
          <div className="space-y-8 text-center hero-fade-in">
            <div className="space-y-4">
              <h2 className="text-2xl font-light text-black">Prepare Your Mind</h2>
              <p className="text-gray-600">Follow the breathing pattern</p>
            </div>

            <MonadSymbol 
              size={200} 
              pulse={getMonadAnimation()} 
              className="mx-auto"
            />

            <div className="space-y-4">
              <p className="text-xl font-light text-black">
                {getBreathingInstruction()}
              </p>
              <div className="text-sm text-gray-500">
                Preparing for {selectedDuration} minute session
              </div>
            </div>
          </div>
        )}

        {/* Focusing State */}
        {(sessionState === 'focusing' || sessionState === 'paused') && (
          <div className="space-y-8 text-center hero-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-light text-black">
                {sessionState === 'paused' ? 'Session Paused' : 'Focus, ' + heroName}
              </h2>
              <p className="text-gray-600">
                {sessionState === 'paused' ? 'Take a moment, then continue' : 'Stay present with the monad'}
              </p>
            </div>

            <MonadSymbol 
              size={200} 
              animate={sessionState === 'focusing'}
              pulse={sessionState === 'focusing'}
              className="mx-auto"
            />

            <div className="space-y-6">
              <div className="text-6xl font-light text-black tabular-nums">
                {formatTime(timeRemaining)}
              </div>

              <div className="flex gap-3 justify-center">
                {sessionState === 'focusing' ? (
                  <Button
                    onClick={pauseSession}
                    variant="outline"
                    className="px-8 py-3 border-gray-300 hover:border-black"
                  >
                    Pause
                  </Button>
                ) : (
                  <Button
                    onClick={resumeSession}
                    className="px-8 py-3 bg-black hover:bg-gray-800 text-white"
                  >
                    Resume
                  </Button>
                )}
                
                <Button
                  onClick={resetSession}
                  variant="outline"
                  className="px-8 py-3 border-gray-300 hover:border-red-500 hover:text-red-500"
                >
                  End Session
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Completed State */}
        {sessionState === 'completed' && (
          <div className="space-y-8 text-center hero-fade-in">
            <div className="space-y-4">
              <MonadSymbol size={120} pulse={true} className="mx-auto" />
              <div>
                <h2 className="text-2xl font-light text-black">Well done, {heroName}</h2>
                <p className="text-gray-600 mt-2">
                  You completed {selectedDuration} minutes of focused practice
                </p>
              </div>
            </div>

            <Card className="p-6 border-gray-200">
              <div className="space-y-3">
                <h3 className="font-medium text-black">Session Complete</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Duration: {selectedDuration} minutes</div>
                  <div>Focus quality: Excellent</div>
                  <div>Journey progress: +1 step forward</div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={resetSession}
                variant="outline"
                className="flex-1 py-3 border-gray-300 hover:border-black"
              >
                New Session
              </Button>
              <Button
                onClick={onBack}
                className="flex-1 py-3 bg-black hover:bg-gray-800 text-white"
              >
                Return to Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}