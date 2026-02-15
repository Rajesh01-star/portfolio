'use client';

import { motion } from 'framer-motion';

interface GradualBlurProps {
  target?: 'parent' | 'screen' | 'ref'; // where the blur attaches
  position?: 'bottom' | 'top' | 'left' | 'right'; // edge of attachment
  height?: string; // height of the blur section
  strength?: number; // intensity multiplier
  divCount?: number; // number of layers
  curve?: 'bezier' | 'linear'; // falloff type - simple implementation for now
  exponential?: boolean; // exponential falloff
  opacity?: number; // overall opacity
  className?: string; // extra classes
  topColor?: string; // legacy support
  bottomColor?: string; // legacy support
}

export const GradualBlur = ({
  target = 'parent',
  position = 'bottom',
  height = '7rem', // Default height
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = true,
  opacity = 1,
  className = '',
  topColor,
  bottomColor
}: GradualBlurProps) => {

  // Determine positioning styles based on 'position' and 'target'
  // For 'target="parent"', we assume absolute positioning within a relative parent.
  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
    pointerEvents: 'none',
  };

  if (position === 'bottom') {
    positionStyles.bottom = 0;
    positionStyles.left = 0;
    positionStyles.right = 0;
    positionStyles.height = height;
    positionStyles.width = '100%';
  } else if (position === 'top') {
    positionStyles.top = 0;
    positionStyles.left = 0;
    positionStyles.right = 0;
    positionStyles.height = height;
    positionStyles.width = '100%';
  } else if (position === 'left') {
    positionStyles.left = 0;
    positionStyles.top = 0;
    positionStyles.bottom = 0;
    positionStyles.width = height; // treat height as width for vertical orientation
    positionStyles.height = '100%';
  } else if (position === 'right') {
    positionStyles.right = 0;
    positionStyles.top = 0;
    positionStyles.bottom = 0;
    positionStyles.width = height;
    positionStyles.height = '100%';
  }

  // Mask gradient direction
  let maskDirection = 'to bottom';
  if (position === 'bottom') maskDirection = 'to bottom'; // transparent at top, opaque at bottom
  if (position === 'top') maskDirection = 'to top';
  if (position === 'left') maskDirection = 'to left';
  if (position === 'right') maskDirection = 'to right';

  // Actually for a "gradual blur" fading OUT into the content, 
  // if it's at the bottom, we want the bottom to be blurry and the top to be clear.
  // So the mask should be opaque at 0% (bottom) and transparent at 100% (top).
  // Let's stick to the logic: "blur is strongest at the edge".

  return (
    <div style={positionStyles} className={`${className}`}>
      {Array.from({ length: divCount }).map((_, i) => {
        // Normalize index from 0 to 1
        const progress = (i + 1) / divCount;

        // Calculate opacity/intensity based on 'exponential' flag
        // If exponential, the blur increases more rapidly closer to the edge
        const layerOpacity = opacity * (exponential ? Math.pow(progress, 2) : progress);

        // Blur amount scales with strength
        const blurAmount = (i + 1) * strength;

        // Gradient mask:
        // The blur layer needs to fade out away from the edge.
        // For 'bottom' position: bottom is 100% opaque (blurry), top is 0% opaque (clear).

        let maskGradient = '';
        const stop = Math.floor(progress * 100);

        if (position === 'bottom') {
          // We want the layer to be visible from bottom up to 'stop' percentage
          // transparent (0%) at top -> opaque (100%) at bottom
          // actually, we layer them. 
          // Smallest blur covers everything? No.
          // Typically:
          // Layer 0: Blur 2px, Mask: Linear Gradient (Black -> Transparent)
          // But to avoid hard edges, each layer covers a portion or fades out at different rates.

          // Simplification: Each layer is full height, but masked to fade out at different points?
          // Or they all fade out over the full height but with different curves?

          // Let's use the mask logic from the previous implementation but refined.
          // Mask: transparent at top (0%) -> black at bottom (100%)
          // The gradient stop changes?

          // Let's try: each layer has the same height, but the mask gradient matches the layer's intensity?
          maskGradient = `linear-gradient(${maskDirection}, rgba(0,0,0,0) 0%, rgba(0,0,0, ${layerOpacity}) ${100}%)`;
          // Wait, if we stack them, the opacities add up. 

          // Correct logic for "Gradual Blur" usually involves:
          // Layer 1: Blur 1px, Mask: 0% -> 100%
          // Layer 2: Blur 2px, Mask: 0% -> 100% (but maybe starts later?)

          // Let's stick to the User's snippet logic implicitly:
          // "maskImage: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)" 
          // but varying the start/end points?

          // Re-reading usage: 5 layers. 
          // Let's imply the mask is always fading from transparent (away from edge) to opaque (at edge).

          // Using a fixed gradient for all, but simple backdrop-filter stacking works wonders.
          // Let's vary the gradient *start* point to make it smoother.

          maskGradient = `linear-gradient(${maskDirection}, rgba(0,0,0,0) ${0}%, rgba(0,0,0, ${1}) ${Math.max(0, 100 - i * (100 / divCount))}%)`;

          // Actually, the previous implementation was:
          // rgba(0,0,0, opacity) 0%, rgba(0,0,0, 0) ${100 - (i * 10)}%
          // That was for top-down.

          // New Plan for Bottom:
          // Top (0%) is transparent. Bottom (100%) is opaque.
          // Layer i (0 to 4):
          // Blur = 2^i
          // Mask = transparent at 0%, opaque at 100%? 
          // To make it gradual, the stronger blurs should be more restricted to the very bottom.
          const startFade = 0; // always start fading from top
          const endFade = 100 - (i * 15); // The stronger blurs (high i) fade in later (closer to bottom)?
          // No, stronger blurs should be at the very bottom.
          // So Layer 4 (Blur 32px) is only visible at the bottom 10%.
          // Layer 0 (Blur 2px) is visible over most of the height.

          maskGradient = `linear-gradient(${maskDirection}, rgba(0,0,0,0) ${0}%, rgba(0,0,0, ${1}) ${100 - (i * 10)}%)`;
          // Wait, 'to bottom' means 0% is top, 100% is bottom.
          // If we want Transparent at Top and Opaque at Bottom:
          // "rgba(0,0,0,0) 0%, rgba(0,0,0,1) X%"
          // Where X is where it becomes fully opaque. 
          // Stronger blurs should be fully opaque only at the very bottom (X near 100).
          // Weaker blurs can be opaque earlier (X near 50).

          const opaquePoint = 100 - (divCount - 1 - i) * 15; // i=0 (weak) -> 100 - 60 = 40%? i=4 (strong) -> 100.
          // Let's try a simpler approach used by 'react-progressive-blur' concepts.

          maskGradient = `linear-gradient(${maskDirection}, rgba(0,0,0,0) 0%, rgba(0,0,0, ${1}) ${100}%)`;
          // Just changing the mask POWER? No.

          // Let's trust the previous logic but reversed.
          // Previous: top (opaque) -> bottom (transparent)
          // `rgba(0,0,0, ${opacity}) 0%, rgba(0,0,0, 0) ${100 - (i * 10)}%`

          // New: top (transparent) -> bottom (opaque)
          // `rgba(0, 0, 0, 0) ${i * 10}%, rgba(0, 0, 0, ${opacity}) 100%`
          maskGradient = `linear-gradient(${maskDirection}, rgba(0,0,0,0) ${i * 15}%, rgba(0,0,0, 1) 100%)`;
        }


        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: i + 1,
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              maskImage: maskGradient,
              WebkitMaskImage: maskGradient,
            }}
          />
        );
      })}
    </div>
  );
};
