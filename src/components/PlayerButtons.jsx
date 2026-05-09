import usePlayerStore from '../store/usePlayerStore'
import '../styles/player-buttons.css'

export default function PlayerButtons() {
  const nextTab = usePlayerStore((s) => s.nextTab)
  const prevTab = usePlayerStore((s) => s.prevTab)

  return (
    <>

     {/* ── Aba anterior ─────────────────────── */}
      <button
        className="prev-tab-btn"
        onClick={prevTab}
        aria-label="Aba anterior"
      />
      
      {/* ── Próxima aba ───────────────────────── */}
      <button
        className="next-tab-btn"
        onClick={nextTab}
        aria-label="Próxima aba"
      />

     
    </>
  )
}

