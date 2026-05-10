import { useEffect, useRef } from 'react'
import PlayerScreen from './components/PlayerScreen'
import usePlayerStore from './store/usePlayerStore'
import playerImg from './assets/player.png'
import PlayerButtons from './components/PlayerButtons'
import upImg from './assets/up.png'
import downImg from './assets/down.png'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import FooterOverlay from './components/FooterOverlay'

/**
 * ═══════════════════════════════════════════════════════
 *  COMO USAR OS BOTÕES DO PLAYER
 * ═══════════════════════════════════════════════════════
 *
 *  Importe o store onde precisar:
 *    import usePlayerStore from './store/usePlayerStore'
 *
 *  Ações disponíveis:
 *    nextTab()      → próxima aba (Sobre > Interesses > Músicas)
 *    prevTab()      → aba anterior
 *    togglePlay()   → play / pause da música atual
 *    play()         → play
 *    pause()        → pause
 *    volumeUp()     → +10%
 *    volumeDown()   → -10%
 *    setVolume(n)   → valor exato 0-100
 *
 *  Leitura de estado global:
 *    currentSong    → { name, url } | null  ← variável global da música
 *    isPlaying      → boolean
 *    volume         → 0-100
 *    activeTab      → 'about' | 'interests' | 'music'
 *
 *  Exemplo de botão externo:
 *    const togglePlay = usePlayerStore(s => s.togglePlay)
 *    <button onClick={togglePlay}>▶/‖</button>
 *  
 *    const nextTab = usePlayerStore(s => s.nextTab)
 *    <button onClick={nextTab}>▶/‖</button>
 *
 * ═══════════════════════════════════════════════════════
 *  COMO ADICIONAR MÚSICAS
 * ═══════════════════════════════════════════════════════
 *
 *  Coloque seus arquivos .mp3 / .ogg / .wav em:
 *    public/music/
 *
 *  O código abaixo usa import.meta.glob para listar automaticamente.
 *  Exemplo: public/music/minhamusica.mp3 aparece na lista como "minhamusica".
 *
 * ═══════════════════════════════════════════════════════
 *  COMO POSICIONAR A TELA
 * ═══════════════════════════════════════════════════════
 *
 *  Ajuste as propriedades CSS de .screen-overlay:
 *    top, left   → posição sobre a imagem
 *    width, height → tamanho da tela
 *    transform   → rotação se necessário
 *
 * ═══════════════════════════════════════════════════════
 */


// ── Carrega músicas de /src/assets/music/ ─────────────────
const musicModules = import.meta.glob(
  '/src/assets/music/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
)

function buildSongList() {
  return Object.entries(musicModules).map(([path, url]) => {

    const fileName = path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '')

    return {
      name: fileName,
      url,
    }
  })
}

function scrollContent(direction) {

  const content =
    document.querySelector('.crt-content')

  if (!content) return

  const amount = 40

  content.scrollBy({
    top: direction === 'up'
      ? -amount
      : amount,

    behavior: 'smooth',
  })
}


// ─────────────────────────────────────────────────────
export default function App() {
  const setSongs = usePlayerStore((s) => s.setSongs)
  const nextTab = usePlayerStore(s => s.nextTab)

  const currentSong = usePlayerStore((s) => s.currentSong)
  const activeTab = usePlayerStore((s) => s.activeTab)

  const hoveredSong = usePlayerStore((s) => s.hoveredSong)
  const setHoveredSong = usePlayerStore((s) => s.setHoveredSong)
  const songs = usePlayerStore((s) => s.songs)

  const holdInterval = useRef(null)

  function startHold(action) {

    // executa imediatamente
    action()

    holdInterval.current = setInterval(() => {
      action()
    }, 120)
  }

  function stopHold() {

    clearInterval(holdInterval.current)
  }

  function upBtn() {

    if (activeTab == 'music') {
      const currentIndex = songs.findIndex(
        (s) => s.url === hoveredSong?.url
      )

      const prevIndex =
        currentIndex > 0
          ? currentIndex - 1
          : songs.length - 1

      setHoveredSong(songs[prevIndex])
    }

    // ── OUTRAS ABAS ───────────────────
    scrollContent('up')
  }

  function downBtn() {

    if (activeTab == 'music') {


      const currentIndex = songs.findIndex(
        (s) => s.url === hoveredSong?.url
      )

      const nextIndex =
        currentIndex < songs.length - 1
          ? currentIndex + 1
          : 0

      setHoveredSong(songs[nextIndex])
    }
    // ── OUTRAS ABAS ───────────────────
    scrollContent('down')
  }

  /* Resolve as URLs das músicas e salva no store */
  useEffect(() => {
    setSongs(buildSongList())
  }, [setSongs])

  return (
    <div className="player-root">
      {/* ── Imagem do player ──────────────────────────── */}
      <div className="player-wrapper">
        <img
          src={playerImg}
          alt="MP3 Player"
          className="player-img"
          draggable={false}
        />

        {/* ── Tela CRT posicionada sobre a imagem ──────
            Ajuste top, left, width, height para encaixar
            no ecrã do seu player.png                    */}
        <div className="screen-overlay">
          <PlayerScreen />
        </div>

        <div className="footer-overlay">
          <FooterOverlay/>
        </div>

        {/* ── Posicione seus botões aqui ─────────────────
          Exemplo: */}
        <PlayerButtons />

        {/* ── UP ───────────────────────────── */}
        <button
          className="up-btn"

          onMouseDown={() => startHold(upBtn)}

          onMouseUp={stopHold}

          onMouseLeave={stopHold}

          onTouchStart={() => startHold(upBtn)}

          onTouchEnd={stopHold}
        >
          <img src={upImg} alt="" draggable={false} />
        </button>

        {/* ── DOWN ─────────────────────────── */}
        <button
          className="down-btn"

          onMouseDown={() => startHold(downBtn)}

          onMouseUp={stopHold}

          onMouseLeave={stopHold}

          onTouchStart={() => startHold(downBtn)}

          onTouchEnd={stopHold}
        >
          <img src={downImg} alt="" draggable={false} />
        </button>

      </div>

      <GlobalAudioPlayer />
    </div>
  )
}
