import { create } from 'zustand'

/**
 * Global player store.
 * `currentSong` is the variável global que expõe a música atual —
 * use `usePlayerStore(s => s.currentSong)` em qualquer componente.
 */
const usePlayerStore = create((set, get) => ({
  // ── Navegação de abas ─────────────────────────────────────────
  activeTab: 'about', // 'about' | 'interests' | 'music' | 'disclaimer'
  setActiveTab: (tab) => set({ activeTab: tab }),

  nextTab: () => {
    const order = ['about', 'interests', 'music', 'disclaimer']
    const idx = order.indexOf(get().activeTab)
    set({ activeTab: order[(idx + 1) % order.length] })
  },
  prevTab: () => {
    const order = ['about', 'interests', 'music', 'disclaimer']
    const idx = order.indexOf(get().activeTab)
    set({ activeTab: order[(idx - 1 + order.length) % order.length] })
  },
  nextSong: () => {

    const {
      songs,
      currentSong,
      setCurrentSong,
      setHoveredSong,
      play,
    } = get()

    if (!songs.length) return

    // sem música atual
    if (!currentSong) {

      setCurrentSong(songs[0])
      setHoveredSong(songs[0])

      play()

      return
    }

    const currentIndex = songs.findIndex(
      (s) => s.url === currentSong.url
    )

    const nextIndex =
      currentIndex < songs.length - 1
        ? currentIndex + 1
        : 0

    const nextSong = songs[nextIndex]

    setCurrentSong(nextSong)

    setHoveredSong(nextSong)

    play()
  },

  currentTime: 0,
  duration: 0,

  setCurrentTime: (time) =>
    set({ currentTime: time }),

  setDuration: (duration) =>
    set({ duration }),

  // ── Música atual (variável global) ────────────────────────────
  // Exposta para uso externo no player físico:
  //   import usePlayerStore from './store/usePlayerStore'
  //   const currentSong = usePlayerStore(s => s.currentSong)
  hoveredSong: null,

  setHoveredSong: (song) =>
    set({ hoveredSong: song }),


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
