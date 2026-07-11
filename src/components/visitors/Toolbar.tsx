
import React from 'react';
import { LayoutGrid, MousePointer2, RefreshCw, Pencil, Upload } from 'lucide-react';
import { useVisitorsStore } from '../../store/useVisitorsStore';

interface ToolbarProps {
  onDrawOpen: () => void;
  onUploadOpen: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onDrawOpen, onUploadOpen }) => {
  const { cards, viewMode, setViewMode, shuffleCards } = useVisitorsStore();

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/5 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="flex bg-neutral-100 dark:bg-black/40 p-1 rounded-xl border border-black/5 dark:border-white/5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm dark:shadow-lg' : 'text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('random')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'random' ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm dark:shadow-lg' : 'text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60'}`}
          >
            <MousePointer2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-black/60 dark:text-white/60 ml-2">
          <span>{cards.length}</span>
          <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>

        {viewMode === 'random' && (
          <button
            onClick={shuffleCards}
            className="p-2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors"
            title="Shuffle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="hidden sm:block text-sm font-medium text-black/60 dark:text-white/60">
        Thanks for posting! <span className="text-red-500">❤️</span>
      </div>

      <div className="flex items-center gap-2">
         <button
          onClick={onDrawOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors font-medium text-xs"
        >
          <Pencil className="w-3.5 h-3.5" />
          Draw
        </button>
        <button
          onClick={onUploadOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors font-medium text-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
