import usePlayerStore from '../store/usePlayerStore'
import '../styles/player-buttons.css'

export default function PlayerButtons() {

  const nextTab = usePlayerStore((s) => s.nextTab)
  const prevTab = usePlayerStore((s) => s.prevTab)

  const activeTab = usePlayerStore((s) => s.activeTab)

  const hoveredSong = usePlayerStore((s) => s.hoveredSong)
  const currentSong = usePlayerStore((s) => s.currentSong)

  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong)

  const play = usePlayerStore((s) => s.play)
  const pause = usePlayerStore((s) => s.pause)

  const isPlaying = usePlayerStore((s) => s.isPlaying)

  function handlePlay() {

    // ── ABA MUSIC ─────────────────────────
    // if (activeTab === 'music') {

      if (!hoveredSong) return

      play()

      // nova música
      setCurrentSong(hoveredSong)

      play()

      return
    // }

    // ── OUTRAS ABAS ──────────────────────
    console.log('ação contextual da aba')
  }

  function handlePause() {

    // ── ABA MUSIC ─────────────────────────
    // if (activeTab === 'music') {

      // só pausa se existir música atual
      if (!currentSong) return

      pause()

      return
    // }

    // ── OUTRAS ABAS ──────────────────────
    console.log('ação contextual da aba')
  }

  return (
    <>

      {/* ── Aba anterior ─────────────────────── */}
      <button
        className="prev-tab-btn"
        onClick={prevTab}
        aria-label="Aba anterior"
      />

      {/* ── Próxima aba ─────────────────────── */}
      <button
        className="next-tab-btn"
        onClick={nextTab}
        aria-label="Próxima aba"
      />

      {/* ── Play / ação ─────────────────────── */}
      <button
        className="play-btn"
        onClick={handlePlay}
        aria-label="Iniciar ação"
      />

      {/* ── Pausar / ação ─────────────────────── */}
      <button
        className="pause-btn"
        onClick={handlePause}
        aria-label="Pausar ação"
      />

    </>
  )
}