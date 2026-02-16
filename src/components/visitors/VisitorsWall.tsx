
'use client'
import React, { useEffect, useState } from 'react';
import { useVisitorsStore } from '../../store/useVisitorsStore';
import VisitorCard from './VisitorCard';
import Toolbar from './Toolbar';
import DrawModal from './DrawModal';
import UploadModal from './UploadModal';
import { Moon } from 'lucide-react';

const VisitorsWall: React.FC = () => {
  const { cards, loadFromStorage, viewMode } = useVisitorsStore();
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <section className="flex flex-col w-full gap-6">
      <Toolbar
        onDrawOpen={() => setIsDrawOpen(true)}
        onUploadOpen={() => setIsUploadOpen(true)}
      />

      <div className={`relative min-h-[600px] w-full border border-black/5 dark:border-white/5 rounded-2xl bg-white/90 dark:bg-neutral-900/20 backdrop-blur-sm overflow-hidden`}>
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
      </div>

      <DrawModal isOpen={isDrawOpen} onClose={() => setIsDrawOpen(false)} />
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </section>
  );
};

export default VisitorsWall;
