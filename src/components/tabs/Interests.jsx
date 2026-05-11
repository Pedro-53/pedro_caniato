/**
 * Aba "Interesses"
 * Edite os arrays `categories` para personalizar.
 */
const categories = [
  {
    label: 'tecnologia',
    items: ['React', 'React native', 'js', 'Golang', 'PHP', 'Apis', 'postgres', 'microsserviços'],
  },
  {
    label: 'música',
    items: ['Rock', 'Eurobeat', 'jungle', 'house', 'Dnb'],
  },
  {
    label: 'outros',
    items: ['Cinema', 'Design Gráfico', 'y2k', 'viagem'],
  },
]

export default function Interests() {
  return (
    <div>
      <p className="crt-title">interesses</p>
      <hr className="crt-divider" />

      {categories.map(({ label, items }) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <div className="crt-line">
            <span className="crt-prompt">&gt;</span>
            <span className="crt-label">{label}</span>
          </div>
          <div className="crt-tags" style={{ paddingLeft: 16 }}>
            {items.map((item) => (
              <span className="crt-tag" key={item}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
