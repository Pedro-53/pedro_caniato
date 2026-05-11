import { useEffect, useRef } from 'react'
import PlayerScreen from './components/PlayerScreen'
import usePlayerStore from './store/usePlayerStore'
import playerImg from './assets/player.png'
import buttonsMobile from './assets/player_buttons_mobile.png'
import PlayerButtons from './components/PlayerButtons'
import upImg from './assets/up.png'
import downImg from './assets/down.png'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import FooterOverlay from './components/FooterOverlay'
import mobileHeader from './assets/mobile_header.png'


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

    <div className="app-shell">

      {/* ===================================================== */}
      {/* DESKTOP PLAYER */}
      {/* ===================================================== */}

      <div className="desktop-player">

        <div className="player-wrapper">

          <img
            src={playerImg}
            alt="MP3 Player"
            className="player-img"
            draggable={false}
          />

          <div className="screen-overlay">
            <PlayerScreen />
          </div>

          <div className="footer-overlay">
            <FooterOverlay />
          </div>

          <PlayerButtons />

          {/* UP */}
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

          {/* DOWN */}
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

      </div>


      {/* ===================================================== */}
      {/* MOBILE PLAYER */}
      {/* ===================================================== */}

      <div className="mobile-layout">

        {/* HEADER */}
        <header className="mobile-header">

          {/* futura imagem */}
          <div className="mobile-header-image">
            <img
              src={mobileHeader}
              alt="Mobile Header"
              className="mobile-header-img"
              draggable={false}
            />
          </div>

          <div className="footer-overlay-mobile">
            <FooterOverlay />
          </div>

        </header>


        {/* CONTEÚDO */}
        <main className="mobile-content">

          <PlayerScreen mobile />

        </main>


        {/* CONTROLES FIXOS */}
        <div className="mobile-controls">

          <img
            src={buttonsMobile}
            alt="Mobile MP3 Player"
            className="mobile-player-img"
            draggable={false}
          />

          <PlayerButtons mobile />

          {/* UP */}
          <button
            className="up-btn mobile-up-btn"
            onClick={upBtn}
          >
            <img src={upImg} alt="" draggable={false} />
          </button>

          {/* DOWN */}
          <button
            className="down-btn mobile-down-btn"
            onClick={downBtn}
          >
            <img src={downImg} alt="" draggable={false} />
          </button>

        </div>

      </div>
      <GlobalAudioPlayer />

    </div>
  )
}
