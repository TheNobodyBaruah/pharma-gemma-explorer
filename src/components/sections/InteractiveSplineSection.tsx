
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
}

export function InteractiveSplineSection({
  className,
  sceneUrl,
  spotlightFill = 'rgba(200, 200, 255, 0.3)',
  spotlightSize = 500,
}: InteractiveSplineSectionProps) {
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
        />
      </div>
    </Card>
  );
}
