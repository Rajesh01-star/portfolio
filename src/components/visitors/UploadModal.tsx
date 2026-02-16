
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useVisitorsStore } from '../../store/useVisitorsStore';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addCard = useVisitorsStore((state) => state.addCard);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File too large (max 3MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preview) {
      addCard({
        image: preview,
        caption: caption || 'A snapshot of a moment',
        username: username || 'Anonymous',
      });
      onClose();
      reset();
    }
  };

  const reset = () => {
    setPreview(null);
    setCaption('');
    setUsername('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upload Photo</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-square w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                  preview ? 'border-transparent bg-neutral-950' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-white/5 mb-4">
                      <UploadCloud className="w-8 h-8 text-white/40" />
                    </div>
                    <p className="text-white/60 font-medium">Click to upload image</p>
                    <p className="text-white/30 text-xs mt-1">JPG, PNG (max 3MB)</p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg"
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Caption</label>
                  <input
                    type="text"
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Tell us something..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!preview}
                  className="flex-1 px-6 py-3 rounded-xl bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  Upload
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;
