
"use client";

import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import { useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <span className="loader"></span>
        </div>
      )}
      <Spline 
        scene={scene} 
        onLoad={() => setIsLoading(false)}
        className="w-full h-full"
      />
    </div>
  );
}
