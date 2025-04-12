"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SimplexNoise } from "simplex-noise";

interface VortexProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  particleCount?: number;
  particleSize?: number;
  defaultSpeed?: number;
  baseHue?: number;
  rangeHue?: number;
  rangeY?: number;
  rangeSpeed?: number;
}

export function Vortex({
  className,
  particleCount = 700,
  particleSize = 1.5,
  backgroundColor = "#111111",
  defaultSpeed = 3,
  baseHue = 220,
  rangeHue = 60,
  rangeY = 100,
  rangeSpeed = 1,
  ...props
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      setDimensions({ width: clientWidth, height: clientHeight });
    };

    // Initial size
    handleResize();

    // Update when window resizes
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles
    const simplex = new SimplexNoise();
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      originY: number;
      speed: number;
      hue: number;
      size: number;
      noise: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const vx = 0;
      const vy = 0;
      particles.push({
        x,
        y,
        vx,
        vy,
        originY: y,
        speed: defaultSpeed + Math.random() * rangeSpeed,
        hue: baseHue + Math.random() * rangeHue - rangeHue / 2,
        size: Math.random() * particleSize + 0.1,
        noise: Math.random() * 10,
      });
    }

    let animationFrameId: number;
    let time = 0;

    // Animation loop
    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      for (const particle of particles) {
        // Update position based on noise
        const noiseX = simplex.noise3D(
          particle.x * 0.003,
          particle.y * 0.003,
          time * 0.01 + particle.noise
        );
        const noiseY = simplex.noise3D(
          particle.x * 0.003 + 100,
          particle.y * 0.003 + 100,
          time * 0.01 + particle.noise
        );

        particle.vx = noiseX * particle.speed;
        particle.vy = (noiseY * particle.speed) / 2;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Keep particles within bounds with wrapping
        if (particle.x > dimensions.width) particle.x = 0;
        else if (particle.x < 0) particle.x = dimensions.width;

        if (particle.y > dimensions.height + rangeY) particle.y = 0;
        else if (particle.y < -rangeY) particle.y = dimensions.height;

        // Calculate distance from original Y position for alpha
        const distFromOrigin = Math.abs(particle.y - particle.originY);
        const alpha =
          1 - Math.min(distFromOrigin / rangeY, 1) ** 2; // Quadratic falloff

        // Draw particle
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      time++;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, backgroundColor, particleCount, particleSize, defaultSpeed, baseHue, rangeHue, rangeY, rangeSpeed]);

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        style={{ zIndex: -1 }}
      />
      {props.children}
    </div>
  );
}
