import { create } from 'zustand';

interface State {
  bootSequence: {
    stage: 'blackout' | 'booting' | 'complete';
    progress: number;
  };
  mouse: { x: number; y: number };
  setBootStage: (stage: 'blackout' | 'booting' | 'complete') => void;
  setMouse: (x: number, y: number) => void;
}

export const useStore = create<State>((set) => ({
  bootSequence: { stage: 'blackout', progress: 0 },
  mouse: { x: 0, y: 0 },
  setBootStage: (stage) => set((state) => ({ bootSequence: { ...state.bootSequence, stage } })),
  setMouse: (x, y) => set({ mouse: { x, y } }),
}));
