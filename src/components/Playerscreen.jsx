import usePlayerStore from '../store/usePlayerStore'
import AboutMe   from './tabs/AboutMe'
import Interests from './tabs/Interests'
import Music     from './tabs/Music'
import '../styles/crt.css'
import Disclaimer from './tabs/Disclaimer'

const TABS = [
  { id: 'about',      label: 'Sobre mim' },
  { id: 'interests',  label: 'Interesses' },
  { id: 'music',      label: 'Músicas' },
  { id: 'disclaimer', label: 'Disclaimer' },
]

export default function PlayerScreen({ style = {}, className = '' }) {
  const activeTab    = usePlayerStore((s) => s.activeTab)
  const setActiveTab = usePlayerStore((s) => s.setActiveTab)

  const tabContent = {
    about:     <AboutMe />,
    interests: <Interests />,
    music:     <Music />,
    disclaimer:  <Disclaimer />,
  }

  return (
    <div className={`crt-screen ${className}`} style={style}>
      <nav className="crt-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`crt-tab${activeTab === t.id ? ' active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div className="crt-content">
        {tabContent[activeTab]}
      </div>
    </div>
  )
}
