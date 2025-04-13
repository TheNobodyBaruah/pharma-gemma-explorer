
import React from 'react';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { SplineScene } from '@/components/ui/spline';
import { cn } from '@/lib/utils';

interface InteractiveSplineSectionProps {
  className?: string;
  sceneUrl: string;
  spotlightFill?: string;
  spotlightSize?: number;
  fallbackContent?: React.ReactNode;
}

export function InteractiveSplineSection({
  className,
  sceneUrl,
  spotlightFill = 'rgba(200, 200, 255, 0.3)',
  spotlightSize = 500,
  fallbackContent,
}: InteractiveSplineSectionProps) {
  const defaultFallback = (
    <div className="text-center p-4">
      <div className="h-32 w-32 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>
      <h3 className="text-xl font-medium text-white">3D Visualization</h3>
      <p className="text-gray-400 mt-2">
        Explore molecular structures in an interactive 3D environment
      </p>
    </div>
  );

  return (
    <Card className={cn(
      "w-full h-full bg-transparent relative overflow-hidden border-none shadow-none",
      className
    )}>
      <Spotlight
        fill={spotlightFill}
        size={spotlightSize}
        className="-top-1/2 -left-1/2 md:-left-1/3 md:-top-1/4"
      />

      <div className="absolute inset-0 z-0 w-full h-full">
        <SplineScene
          scene={sceneUrl}
          className="w-full h-full scale-[1.15] md:scale-[1.0]"
          fallback={fallbackContent || defaultFallback}
        />
      </div>
    </Card>
  );
}
