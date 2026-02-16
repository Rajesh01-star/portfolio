
import React, { useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, Redo2, Eraser, Trash2 } from 'lucide-react';
import { useVisitorsStore } from '../../store/useVisitorsStore';

interface DrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  '#000000', '#FFFFFF', '#FF4D4D', '#3B82F6', '#10B981', '#FACC15', '#FB923C', '#A855F7',
];

const BRUSH_SIZES = [2, 4, 8, 12];

const DrawModal: React.FC<DrawModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [eraserMode, setEraserMode] = useState(false);
  const [caption, setCaption] = useState('');
  const [username, setUsername] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 50;

  const addCard = useVisitorsStore((state) => state.addCard);

  useEffect(() => {
    setCharCount(caption.length);
  }, [caption]);

  const handleSave = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await canvasRef.current.exportImage('png');
      addCard({
        image: dataUrl,
        caption: caption || 'A beautiful doodle',
        username: username || 'Anonymous Artist',
      });
      onClose();
      resetFields();
    } catch (err) {
      console.error("Failed to export drawing", err);
    }
  };

  const resetFields = () => {
    setCaption('');
    setUsername('');
    setEraserMode(false);
    setStrokeColor('#000000');
    setBrushSize(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative bg-[#262626] border border-white/10 rounded-[1.5rem] w-full max-w-[340px] overflow-hidden shadow-2xl flex flex-col p-3"
          >
            {/* Toolbar Top */}
            <div className="flex flex-col gap-2 mb-3 px-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5 max-w-[70%]">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setStrokeColor(color);
                        setEraserMode(false);
                        canvasRef.current?.eraseMode(false);
                      }}
                      className={`w-4 h-4 rounded-full border transition-transform hover:scale-110 ${
                        strokeColor === color && !eraserMode ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  <button onClick={() => canvasRef.current?.undo()} className="p-1 text-white/40 hover:text-white transition-colors">
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => canvasRef.current?.redo()} className="p-1 text-white/40 hover:text-white transition-colors">
                    <Redo2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const newMode = !eraserMode;
                      setEraserMode(newMode);
                      canvasRef.current?.eraseMode(newMode);
                    }}
                    className={`p-1 rounded-md transition-colors ${eraserMode ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'}`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => canvasRef.current?.clearCanvas()} className="p-1 text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              {/* Brush Size Selector */}
              <div className="flex items-center gap-3 py-1 border-t border-white/5">
                <span className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Size</span>
                <div className="flex items-center gap-2">
                  {BRUSH_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`flex items-center justify-center rounded-full transition-all ${
                        brushSize === size ? 'bg-white/20 scale-110' : 'hover:bg-white/5'
                      }`}
                      style={{ width: '18px', height: '18px' }}
                    >
                      <div 
                        className="rounded-full bg-white" 
                        style={{ width: `${Math.max(2, size/1.5)}px`, height: `${Math.max(2, size/1.5)}px` }} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawing Surface */}
            <div className="relative aspect-square w-full bg-[#BDBDBD] rounded-lg overflow-hidden mb-3">
              <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={brushSize}
                strokeColor={strokeColor}
                canvasColor="transparent"
                eraserWidth={Math.max(20, brushSize * 2)}
                style={{ border: 'none' }}
              />
            </div>

            {/* Inputs Section */}
            <div className="space-y-2 px-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/5 rounded-lg text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all"
              />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, MAX_CHARS))}
                placeholder="Message..."
                rows={1}
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/5 rounded-lg text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="relative flex items-center justify-center w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={75.4}
                    strokeDashoffset={75.4 - (charCount / MAX_CHARS) * 75.4}
                    className="text-green-500 transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white/80">
                  {MAX_CHARS - charCount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-white/10 text-white text-xs font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg bg-[#A3A3A3] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DrawModal;
