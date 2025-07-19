import { useState, useEffect } from 'react'
import { WelcomeScreen } from './components/WelcomeScreen'
import { HeroJourneyDashboard } from './components/HeroJourneyDashboard'
import { FocusTraining } from './components/FocusTraining'

type AppState = 'welcome' | 'dashboard' | 'focus' | 'progress' | 'wisdom'

interface UserData {
  name: string
  sessionsCompleted: number
  totalFocusTime: number
  currentStage: number
}

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [userData, setUserData] = useState<UserData | null>(null)

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUserData = localStorage.getItem('focus-app-user')
    if (savedUserData) {
      try {
        const parsed = JSON.parse(savedUserData)
        setUserData(parsed)
        setAppState('dashboard')
      } catch (error) {
        console.error('Error loading user data:', error)
        localStorage.removeItem('focus-app-user')
      }
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('focus-app-user', JSON.stringify(userData))
    }
  }, [userData])

  const handleNameSubmit = (name: string) => {
    const newUserData: UserData = {
      name,
      sessionsCompleted: 0,
      totalFocusTime: 0,
      currentStage: 0
    }
    setUserData(newUserData)
    setAppState('dashboard')
  }

  const handleStartFocus = () => {
    setAppState('focus')
  }

  const handleFocusComplete = (duration: number) => {
    if (userData) {
      setUserData(prev => prev ? {
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1,
        totalFocusTime: prev.totalFocusTime + duration,
        currentStage: Math.min(prev.currentStage + 1, 4) // Max 5 stages (0-4)
      } : prev)
    }
    setAppState('dashboard')
  }

  const handleBackToDashboard = () => {
    setAppState('dashboard')
  }

  const handleViewProgress = () => {
    setAppState('progress')
    // For now, just go back to dashboard
    // In a full implementation, this would show progress analytics
    setTimeout(() => setAppState('dashboard'), 100)
  }

  const handleViewWisdom = () => {
    setAppState('wisdom')
    // For now, just go back to dashboard
    // In a full implementation, this would show wisdom library
    setTimeout(() => setAppState('dashboard'), 100)
  }

  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {appState === 'welcome' && (
        <WelcomeScreen onNameSubmit={handleNameSubmit} />
      )}
      
      {appState === 'dashboard' && userData && (
        <HeroJourneyDashboard
          heroName={userData.name}
          onStartFocus={handleStartFocus}
          onViewProgress={handleViewProgress}
          onViewWisdom={handleViewWisdom}
        />
      )}
      
      {appState === 'focus' && userData && (
        <FocusTraining
          heroName={userData.name}
          onBack={handleBackToDashboard}
          onComplete={handleFocusComplete}
        />
      )}
    </div>
  )
}

export default App