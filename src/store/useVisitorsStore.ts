
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
  saveToStorage: () => void;
  loadFromDatabase: (dbCards: any[]) => void;
}

const STORAGE_KEY = 'visitors-wall-data';

export const useVisitorsStore = create<VisitorsState>((set, get) => ({
  cards: [],
  viewMode: 'random',

  setViewMode: (mode) => set({ viewMode: mode }),

  addCard: (newCardData) => {
    // Card dimensions (matching VisitorCard.tsx)
    const cardWidth = 140;
    const cardHeight = 180;

    // Use actual canvas bounds (max 540px wrapper * 1.4 for the 140% pannable area)
    const baseWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 540) : 540;
    const containerWidth = baseWidth * 1.4;
    const containerHeight = 600 * 1.4; // 140% of the 600px min-height

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
    const cardWidth = 140;
    const cardHeight = 180;

    // Use actual canvas bounds (max 540px wrapper * 1.4 for the 140% pannable area)
    const baseWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 540) : 540;
    const containerWidth = baseWidth * 1.4;
    const containerHeight = 600 * 1.4; // 140% of the 600px min-height

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

  loadFromDatabase: (dbCards) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let localCards: VisitorCardType[] = [];
    if (stored) {
      try {
        localCards = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored visitors", e);
      }
    }

    const cardWidth = 140;
    const cardHeight = 180;
    const baseWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 540) : 540;
    const containerWidth = baseWidth * 1.4;
    const containerHeight = 600 * 1.4;
    const margin = 50;
    const maxX = containerWidth - cardWidth - margin;
    const maxY = containerHeight - cardHeight - margin;

    const mergedCards = dbCards.map((dbCard) => {
      const local = localCards.find((c) => c.id === dbCard.id.toString());
      if (local) {
        return {
          ...dbCard,
          id: dbCard.id.toString(),
          image: dbCard.imageUrl,
          x: local.x,
          y: local.y,
          rotation: local.rotation,
          zIndex: local.zIndex,
        };
      }
      
      return {
        ...dbCard,
        id: dbCard.id.toString(),
        image: dbCard.imageUrl,
        x: margin + Math.random() * Math.max(0, maxX - margin),
        y: margin + Math.random() * Math.max(0, maxY - margin),
        rotation: Math.random() * 30 - 15,
        zIndex: 1,
      };
    });

    set({ cards: mergedCards });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedCards));
  },
}));
