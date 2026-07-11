
import React from 'react';
import { motion } from 'framer-motion';
import { VisitorCardType, useVisitorsStore } from '../../store/useVisitorsStore';

interface VisitorCardProps {
  card: VisitorCardType;
  gridIndex?: number;
}

const VisitorCard: React.FC<VisitorCardProps> = ({ card, gridIndex }) => {
  const { bringToFront, updatePosition, viewMode } = useVisitorsStore();

  // Grid layout calculation for 540px max-width container
  const containerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 540) : 540;
  
  // Calculate how many columns can fit. Card is 140px, gap is 16px.
  // 3 columns need ~452px. 2 columns need ~296px.
  const columns = containerWidth < 460 ? 2 : 3;
  
  const cardWidth = 140;
  const cardHeight = 180;
  const gap = 16;
  
  const totalGridWidth = (columns * cardWidth) + ((columns - 1) * gap);
  const startX = Math.max(0, (containerWidth - totalGridWidth) / 2);
  
  const gridX = gridIndex !== undefined ? startX + (gridIndex % columns) * (cardWidth + gap) : 0;
  const gridY = gridIndex !== undefined ? Math.floor(gridIndex / columns) * (cardHeight + gap) + 40 : 0;

  const isGrid = viewMode === 'grid';

  return (
    <motion.div
      drag={!isGrid}
      dragMomentum={true}
      dragElastic={0.1}
      layout
      initial={isGrid ? { opacity: 0 } : { scale: 0, opacity: 0, x: card.x, y: card.y, rotate: card.rotation }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        x: isGrid ? gridX : card.x, 
        y: isGrid ? gridY : card.y, 
        rotate: isGrid ? 0 : card.rotation,
        zIndex: card.zIndex 
      }}
      onDragStart={() => bringToFront(card.id)}
      onDragEnd={(_, info) => {
        if (!isGrid) {
          updatePosition(card.id, card.x + info.offset.x, card.y + info.offset.y);
        }
      }}
      whileHover={{ scale: 1.05, zIndex: 1000, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 1000 }}
      className={`absolute cursor-grab p-2 bg-white dark:bg-[#262626] border border-black/10 dark:border-white/5 shadow-2xl rounded-2xl flex flex-col`}
      style={{ 
        width: cardWidth,
        height: cardHeight,
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      <div className="bg-neutral-100 dark:bg-[#D1D1D1] w-full aspect-square overflow-hidden rounded-xl">
        <img 
          src={card.image} 
          alt={`Post by ${card.username}`} 
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
      <div className="mt-2 flex flex-col px-1">
        <span className="text-neutral-500 dark:text-[#A3A3A3] font-bold text-[10px] leading-tight flex items-center gap-1 truncate">
          {card.username}
        </span>
        <p className="text-black dark:text-white text-xs font-medium mt-0.5 truncate">
          {card.caption}
        </p>
      </div>
    </motion.div>
  );
};

export default VisitorCard;
