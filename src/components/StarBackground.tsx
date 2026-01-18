"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  dx: number;
  dy: number;
  twinkleSpeed: number;
}

import { useTheme } from "next-themes";

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) * 0.00005); // Significantly reduced density for cleaner look
      for (let i = 0; i < numStars; i++) {
        stars.push(createStar(canvas));
      }
    };

    const createStar = (canvas: HTMLCanvasElement): Star => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Slightly larger range for visibility without clutter
        alpha: Math.random() * 0.5 + 0.1, // Lower max alpha for subtlety
        dx: (Math.random() - 0.5) * 0.2, // Very slow horizontal drift
        dy: (Math.random() - 0.5) * 0.2, // Very slow vertical drift
        twinkleSpeed: Math.random() * 0.005 + 0.001, // Slower twinkle
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const starColor = theme === 'dark' ? '255, 255, 255' : '23, 23, 23'; // White in dark mode, Dark in light mode

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Slower, subtler twinkle
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.002;
        const visibleAlpha = Math.max(0.05, Math.min(0.6, star.alpha));
        
        ctx.fillStyle = `rgba(${starColor}, ${visibleAlpha})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
