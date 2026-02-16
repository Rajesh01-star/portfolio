
import { create } from 'zustand';

export type VisitorCardType = {
  id: string;
  image: string; // Base64 string
  caption: string;
  username: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
};


interface VisitorsState {
  cards: VisitorCardType[];
  viewMode: 'grid' | 'random';
  setViewMode: (mode: 'grid' | 'random') => void;
  addCard: (card: Omit<VisitorCardType, 'id' | 'zIndex' | 'rotation' | 'x' | 'y'>) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  bringToFront: (id: string) => void;
  shuffleCards: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const STORAGE_KEY = 'visitors-wall-data';

export const useVisitorsStore = create<VisitorsState>((set, get) => ({
  cards: [],
  viewMode: 'random',

  setViewMode: (mode) => set({ viewMode: mode }),

  addCard: (newCardData) => {
    // Card dimensions (matching VisitorCard.tsx)
    const cardWidth = 200;
    const cardHeight = 280;

    // Use a reasonable container width (most content areas are max 1200-1400px)
    const containerWidth = Math.min(window.innerWidth * 0.9, 1200);
    const containerHeight = 600; // min-height from VisitorsWall

    // Margins to keep cards well within bounds
    const margin = 50;

    // Calculate safe random position ensuring card stays fully inside
    const maxX = containerWidth - cardWidth - margin;
    const maxY = containerHeight - cardHeight - margin;

    const x = margin + Math.random() * Math.max(0, maxX - margin);
    const y = margin + Math.random() * Math.max(0, maxY - margin);
    const rotation = Math.random() * 30 - 15;
    const maxZ = Math.max(0, ...get().cards.map(c => c.zIndex)) + 1;

    const newCard: VisitorCardType = {
      ...newCardData,
      id: crypto.randomUUID(),
      x,
      y,
      rotation,
      zIndex: maxZ,
    };

    set((state) => ({
      cards: [...state.cards, newCard],
    }));
    get().saveToStorage();
  },

  updatePosition: (id, x, y) => {
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, x, y } : c)),
    }));
    get().saveToStorage();
  },

  bringToFront: (id) => {
    const maxZ = Math.max(0, ...get().cards.map(c => c.zIndex)) + 1;
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, zIndex: maxZ } : c)),
    }));
    get().saveToStorage();
  },

  shuffleCards: () => {
    // Card dimensions (matching VisitorCard.tsx)
    const cardWidth = 200;
    const cardHeight = 280;

    // Use a reasonable container width (most content areas are max 1200-1400px)
    const containerWidth = Math.min(window.innerWidth * 0.9, 1200);
    const containerHeight = 600; // min-height from VisitorsWall

    // Margins to keep cards well within bounds
    const margin = 50;

    // Calculate safe random position ensuring card stays fully inside
    const maxX = containerWidth - cardWidth - margin;
    const maxY = containerHeight - cardHeight - margin;

    set((state) => ({
      viewMode: 'random',
      cards: state.cards.map((c) => ({
        ...c,
        x: margin + Math.random() * Math.max(0, maxX - margin),
        y: margin + Math.random() * Math.max(0, maxY - margin),
        rotation: Math.random() * 30 - 15,
      })),
    }));
    get().saveToStorage();
  },

  saveToStorage: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get().cards));
  },

  loadFromStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        set({ cards: JSON.parse(stored) });
      } catch (e) {
        console.error("Failed to parse stored visitors", e);
      }
    }
  },
}));
