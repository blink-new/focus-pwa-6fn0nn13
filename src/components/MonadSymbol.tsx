import { cn } from "@/lib/utils"

interface MonadSymbolProps {
  size?: number
  className?: string
  animate?: boolean
  pulse?: boolean
}

export function MonadSymbol({ 
  size = 120, 
  className, 
  animate = false, 
  pulse = false 
}: MonadSymbolProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        animate && "monad-rotate",
        pulse && "monad-pulse",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Outer circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="opacity-80"
        />
        
        {/* Inner yin-yang pattern */}
        <path
          d="M100 20 C 144.18 20 180 55.82 180 100 C 180 144.18 144.18 180 100 180 C 100 144.18 100 100 100 100 C 100 100 100 55.82 100 20 Z"
          fill="currentColor"
          className="opacity-90"
        />
        
        <path
          d="M100 20 C 55.82 20 20 55.82 20 100 C 20 144.18 55.82 180 100 180 C 100 144.18 100 100 100 100 C 100 100 100 55.82 100 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-60"
        />
        
        {/* Central dots */}
        <circle
          cx="100"
          cy="70"
          r="8"
          fill="white"
          className="opacity-90"
        />
        
        <circle
          cx="100"
          cy="130"
          r="8"
          fill="currentColor"
          className="opacity-90"
        />
        
        {/* Subtle inner curves for depth */}
        <path
          d="M100 100 C 122.09 100 140 82.09 140 60 C 140 37.91 122.09 20 100 20"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="opacity-40"
        />
        
        <path
          d="M100 100 C 77.91 100 60 117.91 60 140 C 60 162.09 77.91 180 100 180"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="opacity-40"
        />
      </svg>
    </div>
  )
}