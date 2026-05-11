import { useEffect, useRef } from 'react'
import usePlayerStore from '../../store/usePlayerStore'
import GlobalAudioPlayer from '../GlobalAudioPlayer'

/**
 * Aba "Músicas"
 *
 * Como popular a lista:
 *   Coloque seus arquivos de áudio em /public/music/
 *   e exporte-os via import.meta.glob no App.jsx (veja o exemplo em App.jsx).
 *   O store já recebe a lista via setSongs({ name, url }[]).
 *
 * Controles externos:
 *   - play/pause vem de botão externo → chame usePlayerStore(s => s.togglePlay)
 *   - next/prev de botões externos  → chame usePlayerStore(s => s.nextTab) ou
 *     implemente nextSong/prevSong no store se quiser navegação de faixa.
 */
export default function Music() {

  const songs = usePlayerStore((s) => s.songs)
  const currentSong = usePlayerStore((s) => s.currentSong)
  const isPlaying = usePlayerStore((s) => s.isPlaying)
  const volume = usePlayerStore((s) => s.volume)
  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong)
  const play = usePlayerStore((s) => s.play)
  const pause = usePlayerStore((s) => s.pause)
  const hoveredSong = usePlayerStore((s) => s.hoveredSong)
  const setHoveredSong = usePlayerStore((s) => s.setHoveredSong)


  useEffect(() => {

    if (songs.length === 0) return

    // já existe hover
    if (hoveredSong) return

    // usa música atual
    if (currentSong) {
      setHoveredSong(currentSong)
      return
    }

    // fallback → primeira música
    setHoveredSong(songs[0])

  }, [
    songs,
    hoveredSong,
    currentSong,
    setHoveredSong,
  ])

  const handleSelect = (song) => {

    const isCurrentSong =
      currentSong?.url === song.url

    // mesma música
    if (isCurrentSong) {

      isPlaying
        ? pause()
        : play()

      return
    }

    // nova música
    setCurrentSong(song)
    setHoveredSong(song)

    play()
  }

  const segments = 10
  const lit = Math.round((volume / 100) * segments)

  return (
    <div>
      <p className="crt-title">minhas músicas favoritas</p>
      <hr className="crt-divider" />

      {/* Volume visual */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span className="crt-label" style={{ fontSize: 12 }}>vol</span>
        <div className="crt-vol-bar">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`crt-vol-seg${i < lit ? ' lit' : ''}`}
            />
          ))}
        </div>
        <span className="crt-text" style={{ fontSize: 11 }}>{volume}%</span>
      </div> */}

      {/* Lista de faixas */}
      {songs.length === 0 ? (
        <div className="crt-line">
          <span className="crt-prompt">&gt;</span>
          <span className="crt-text" style={{ opacity: 0.5 }}>
            nenhuma música encontrada
          </span>
        </div>
      ) : (
        <ul className="crt-song-list">
          {songs.map((song) => {
            const active = currentSong?.url === song.url
            const isHovered = hoveredSong?.url === song.url

            return (
              <li
                key={song.url}
                className={`crt-song-item${isHovered ? ' active' : ''}`}
                onClick={() => handleSelect(song)}
              >
                <span className="song-icon">
                  {active && isPlaying ? '▶' : active ? '‖' : '○'}
                </span>
                <span className="song-name">{song.name}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
