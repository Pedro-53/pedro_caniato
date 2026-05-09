import { useEffect } from 'react'
import PlayerScreen from './components/PlayerScreen'
import usePlayerStore from './store/usePlayerStore'
import playerImg from './assets/player.png'
import PlayerButtons from './components/PlayerButtons'
import upImg from './assets/up.png'
import downImg from './assets/down.png'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'

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


// ─────────────────────────────────────────────────────
export default function App() {
  const setSongs = usePlayerStore((s) => s.setSongs)
  const nextTab = usePlayerStore(s => s.nextTab)

  const currentSong = usePlayerStore((s) => s.currentSong)
  const activeTab = usePlayerStore((s) => s.activeTab)

  function upBtn() {

    console.log('aba atual:', activeTab)

    console.log(
      'música atual:',
      currentSong?.name ?? 'nenhuma'
    )
  }


  function downBtn() {
    console.log("down acionado")
    console.log('aba atual:', activeTab)

    console.log(
      'música atual:',
      currentSong?.name ?? 'nenhuma'
    )
    
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


        {/* ── Posicione seus botões aqui ─────────────────
          Exemplo: */}
        <PlayerButtons />

        {/* ── UP ───────────────────────────── */}
        <button
          className="up-btn"
          onClick={upBtn}
        >
          <img src={upImg} alt="" draggable={false} />
        </button>

        {/* ── DOWN ─────────────────────────── */}
        <button
          className="down-btn"
          onClick={downBtn}
        >
          <img src={downImg} alt="" draggable={false} />
        </button>

      </div>

      <GlobalAudioPlayer />
    </div>
  )
}
