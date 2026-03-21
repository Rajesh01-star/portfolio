
import React from 'react';
import { motion } from 'framer-motion';
import { VisitorCardType, useVisitorsStore } from '../../store/useVisitorsStore';

interface VisitorCardProps {
  card: VisitorCardType;
  gridIndex?: number;
}

const VisitorCard: React.FC<VisitorCardProps> = ({ card, gridIndex }) => {
  const { bringToFront, updatePosition, viewMode } = useVisitorsStore();

  // Grid layout calculation
  const columns = window.innerWidth < 768 ? 1 : 3;
  const cardWidth = window.innerWidth < 768 ? 240 : 200;
  const cardHeight = window.innerWidth < 768 ? 320 : 280;
  const gap = 20;
  
  const gridX = gridIndex !== undefined ? (gridIndex % columns) * (cardWidth + gap) + (window.innerWidth / 2 - (columns * (cardWidth + gap)) / 2) : 0;
  const gridY = gridIndex !== undefined ? Math.floor(gridIndex / columns) * (cardHeight + gap) + 150 : 0;

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
      className={`absolute cursor-grab p-3 bg-[#262626] border border-white/5 shadow-2xl rounded-2xl w-[200px] md:w-[200px] flex flex-col`}
      style={{ 
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      <div className="bg-[#D1D1D1] w-full aspect-square overflow-hidden rounded-xl">
        <img 
          src={card.image} 
          alt={`Post by ${card.username}`} 
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>
      <div className="mt-3 flex flex-col">
        <span className="text-[#A3A3A3] font-bold text-sm leading-tight flex items-center gap-1">
          {card.username}
        </span>
        <p className="text-white text-sm font-medium mt-1">
          {card.caption}
        </p>
      </div>
    </motion.div>
  );
};

export default VisitorCard;
