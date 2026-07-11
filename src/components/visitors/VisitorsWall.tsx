
'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useVisitorsStore } from '../../store/useVisitorsStore';
import VisitorCard from './VisitorCard';
import Toolbar from './Toolbar';
import DrawModal from './DrawModal';
import UploadModal from './UploadModal';
import { Moon } from 'lucide-react';
import { getVisitorCards } from '../../actions/getCards';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const VisitorsWall: React.FC = () => {
  const { cards, loadFromDatabase, viewMode } = useVisitorsStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { data: dbCards, isSuccess } = useQuery({
    queryKey: ['visitorCards'],
    queryFn: getVisitorCards,
    refetchInterval: 10000, // Optional: auto refresh every 10s
  });

  useEffect(() => {
    if (isSuccess && dbCards) {
      loadFromDatabase(dbCards);
    }
  }, [isSuccess, dbCards, loadFromDatabase]);

  const isGrid = viewMode === 'grid';
  const containerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 540) : 540;
  const columns = containerWidth < 460 ? 2 : 3;
  const cardHeight = 180;
  const gap = 16;
  const rowCount = Math.ceil(cards.length / columns);
  const gridContentHeight = rowCount * (cardHeight + gap) + 100;

  return (
    <section className="flex flex-col w-full gap-6">
      <Toolbar
        onDrawOpen={() => setIsDrawOpen(true)}
        onUploadOpen={() => setIsUploadOpen(true)}
      />

      <div 
        ref={containerRef}
        className={`relative w-full h-[600px] border border-black/5 dark:border-white/5 rounded-2xl bg-white/90 dark:bg-neutral-900/20 backdrop-blur-sm ${isGrid ? 'overflow-y-auto' : 'overflow-hidden cursor-grab active:cursor-grabbing'}`}
      >
        <motion.div
          drag={!isGrid}
          dragConstraints={containerRef}
          animate={{ x: isGrid ? 0 : undefined, y: isGrid ? 0 : undefined }}
          className="absolute"
          style={{
            width: isGrid ? '100%' : '140%',
            height: isGrid ? Math.max(600, gridContentHeight) : '140%',
            left: isGrid ? '0%' : '-20%',
            top: isGrid ? '0%' : '-20%',
          }}
        >
          {/* Inner grid for visual reference */}
          <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

          {cards.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <h1 className="text-4xl md:text-5xl font-bold text-black/10 dark:text-white/10 mb-2 font-handwritten">No visitors yet...</h1>
            <p className="text-black/20 dark:text-white/5 max-w-sm">Use the tools above to leave your mark!</p>
          </div>
        ) : (
          cards.map((card, index) => (
            <VisitorCard
              key={card.id}
              card={card}
              gridIndex={viewMode === 'grid' ? index : undefined}
            />
          ))
        )}
        </motion.div>
      </div>

      <DrawModal isOpen={isDrawOpen} onClose={() => setIsDrawOpen(false)} />
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </section>
  );
};

export default VisitorsWall;
