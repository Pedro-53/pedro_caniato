import { create } from 'zustand'

/**
 * Global player store.
 * `currentSong` is the variável global que expõe a música atual —
 * use `usePlayerStore(s => s.currentSong)` em qualquer componente.
 */
const usePlayerStore = create((set, get) => ({
  // ── Navegação de abas ─────────────────────────────────────────
  activeTab: 'about', // 'about' | 'interests' | 'music'
  setActiveTab: (tab) => set({ activeTab: tab }),

  nextTab: () => {
    const order = ['about', 'interests', 'music']
    const idx = order.indexOf(get().activeTab)
    set({ activeTab: order[(idx + 1) % order.length] })
  },
  prevTab: () => {
    const order = ['about', 'interests', 'music']
    const idx = order.indexOf(get().activeTab)
    set({ activeTab: order[(idx - 1 + order.length) % order.length] })
  },

  // ── Música atual (variável global) ────────────────────────────
  // Exposta para uso externo no player físico:
  //   import usePlayerStore from './store/usePlayerStore'
  //   const currentSong = usePlayerStore(s => s.currentSong)
  currentSong: null,   // { name: string, url: string } | null
  setCurrentSong: (song) => set({ currentSong: song, isPlaying: false }),

  // ── Reprodução ────────────────────────────────────────────────
  isPlaying: false,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  // ── Volume ────────────────────────────────────────────────────
  volume: 80,           // 0-100
  volumeUp: () => set((s) => ({ volume: Math.min(100, s.volume + 10) })),
  volumeDown: () => set((s) => ({ volume: Math.max(0, s.volume - 10) })),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(100, v)) }),

  // ── Lista de músicas ──────────────────────────────────────────
  songs: [],            // { name, url }[]
  setSongs: (songs) => set({ songs }),
}))

export default usePlayerStore
