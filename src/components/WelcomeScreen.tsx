import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MonadSymbol } from "./MonadSymbol"

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void
}

export function WelcomeScreen({ onNameSubmit }: WelcomeScreenProps) {
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    
    setIsSubmitting(true)
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      onNameSubmit(name.trim())
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12 text-center">
        
        {/* Animated Monad */}
        <div className="hero-fade-in">
          <MonadSymbol 
            size={160} 
            animate={true} 
            pulse={true}
            className="mx-auto mb-8"
          />
        </div>

        {/* Welcome Text */}
        <div className="space-y-6 hero-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="space-y-3">
            <h1 className="text-4xl font-light tracking-tight text-black">
              Focus
            </h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Begin your journey to mastery.<br />
              Every hero needs a name.
            </p>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg py-6 border-gray-200 focus:border-black focus:ring-black bg-white"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
            
            <Button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="w-full py-6 text-lg font-medium bg-black hover:bg-gray-800 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Beginning journey...</span>
                </div>
              ) : (
                "Begin Journey"
              )}
            </Button>
          </form>
        </div>

        {/* Subtle Footer */}
        <div className="hero-slide-up opacity-60" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-gray-400 font-light">
            A progressive web app for focus mastery
          </p>
        </div>
      </div>
    </div>
  )
}