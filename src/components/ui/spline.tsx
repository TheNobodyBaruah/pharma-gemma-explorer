
"use client";

import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import { useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error("Failed to load Spline scene:", scene);
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <span className="loader"></span>
        </div>
      )}
      
      {hasError && fallback ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback}
        </div>
      ) : (
        <Spline 
          scene={scene} 
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          className="w-full h-full"
        />
      )}
    </div>
  );
}
