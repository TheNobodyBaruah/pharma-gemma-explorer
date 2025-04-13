
"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface SpotlightProps {
  children?: ReactNode;
  className?: string;
  fill?: string;
  size?: number;
}

export function Spotlight({
  children,
  className,
  fill = "rgba(120, 119, 198, 0.35)",
  size = 350,
}: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${fill}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
