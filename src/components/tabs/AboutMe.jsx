import maracana from "../../assets/places/maracana.jpg"
import sc from "../../assets/places/sc.jpg"
import ms from "../../assets/places/ms.jpeg"
import pr from "../../assets/places/pr.jpeg"

/**
 * Aba "Sobre mim"
 * Edite as linhas dentro de `lines` para personalizar seu conteúdo.
 */
export default function AboutMe() {
  const lines = [
    { label: 'nome', value: 'Pedro Caniato' },
    { label: 'função', value: 'Desenvolvedor / Designer' },
    { label: 'estudante', value: 'Analise e desenvolvimetno de sistemas' },
    { label: 'contato', value: 'caniatopedro53@email.com' },
  ]

  return (
    <div>
      <p className="crt-title crt-cursor">Sobre Mim:</p>
      <hr className="crt-divider" />

      {lines.map(({ label, value }) => (
        <div className="crt-line" key={label}>
          <span className="crt-prompt">&gt;</span>
          <span className="crt-label">{label}:</span>
          <span className="crt-text">{value}</span>
        </div>
      ))}

      <hr className="crt-divider" />

      <div style={{display:"flex", flexDirection:"column"}}>

        <div className="crt-line">
          <span className="crt-prompt">&gt;</span>
          <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Sou programador e estudante de análise e desenvolvimento de sistemas.
          </span>
        </div>

        <div className="crt-line">
          <span className="crt-prompt">&gt;</span>
          <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
            Gosto de tecnologia, cerveja e viajar.
          </span>
        </div>

        <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
          Rio
        </span>

        <img src={maracana} alt="" className="places-img" />

        <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
          SC
        </span>
        <img src={sc} alt="" className="places-img" />

        <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
          MS
        </span>
        <img src={ms} alt="" className="places-img" />

        <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
          PR
        </span>
        <img src={pr} alt="" className="places-img" />

      </div>

    </div>
  )
}
