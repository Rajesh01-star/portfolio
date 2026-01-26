"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset loaded state on theme change to fade in new stars smoothly (optional)
    // setIsLoaded(false); 

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const STAR_COUNT = 800;
    const DEPTH = 1000;
    const FOV = 600;
    const ROTATION_SPEED = 0.00005;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width * 2 - width,
          y: Math.random() * height * 2 - height,
          z: Math.random() * DEPTH,
          radius: Math.random() * 1.5,
          color: "white"
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() < 0.995) return;
      if (shootingStars.length > 1) return;

      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 2.5 + 2.5,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1
      });
    };

    const updateStars = () => {
      stars.forEach(star => {
        const cosT = Math.cos(ROTATION_SPEED);
        const sinT = Math.sin(ROTATION_SPEED);

        const oldX = star.x;
        const oldZ = star.z;

        star.x = oldX * cosT - oldZ * sinT;
        star.z = oldX * sinT + oldZ * cosT;

        if (star.z > DEPTH) star.z -= DEPTH;
        if (star.z < 0) star.z += DEPTH;
      });
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Theme-based colors
      // Note: usage of 'theme' here depends on it being up-to-date. 
      // Ensure 'theme' is available. 
      const isDark = theme === 'dark' || !theme; // Default to dark if undefined
      const baseAlpha = isDark ? 1 : 0.7;
      const baseColor = isDark ? '255, 255, 255' : '0, 0, 0'; // White stars on dark, Black on light

      stars.forEach(star => {
        const scale = FOV / (FOV + star.z);
        const sx = star.x * scale + cx;
        const sy = star.y * scale + cy;
        const r = star.radius * scale;

        if (sx < 0 || sx > width || sy < 0 || sy > height) return;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);

        const alpha = Math.min(1, scale) * baseAlpha * (0.5 + Math.random() * 0.4);
        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.fill();
      });

      createShootingStar();

      shootingStars.forEach((star, index) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(index, 1);
          return;
        }

        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(${baseColor}, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(${baseColor}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });

      updateStars();

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    initStars();
    draw();

    // Trigger load state
    const timeout = setTimeout(() => setIsLoaded(true), 200);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [theme]);

  return (
    <div className={`fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black transition-colors duration-300`}>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
