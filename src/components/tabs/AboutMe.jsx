import maracana from "../../assets/places/maracana.jpg"

/**
 * Aba "Sobre mim"
 * Edite as linhas dentro de `lines` para personalizar seu conteúdo.
 */
export default function AboutMe() {
  const lines = [
    { label: 'nome',     value: 'Pedro Caniato' },
    { label: 'cidade',   value: 'Apucarana - PR, BR' },
    { label: 'função',   value: 'Desenvolvedor / Designer' },
    { label: 'estudante',   value: 'Analise e desenvolvimetno de sistemas' },
    { label: 'contato',  value: 'caniatopedro53@email.com' },
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

      <div className="crt-line">
        <span className="crt-prompt">&gt;</span>
        <span className="crt-text" style={{ opacity: 0.7, fontStyle: 'italic' }}>
          Uma frase curta sobre você aqui.
        </span>

        <img src={maracana} alt="" style={{maxWidth: 300}} />

      </div>
    </div>
  )
}
