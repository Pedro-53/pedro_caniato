export default function Disclaimer() {

    return (

        <div>

            <p className="crt-title crt-cursor">
                Disclaimer
            </p>

            <hr className="crt-divider" />

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <span
                    className="crt-text"
                    style={{
                        opacity: 0.7,
                        fontStyle: 'italic',
                    }}
                >
                    Este projeto foi desenvolvido exclusivamente
                    para fins acadêmicos como um trabalho de curto
                    período relacionado ao curso de Análise e
                    Desenvolvimento de Sistemas.
                </span>
            </div>

            <br />

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <span
                    className="crt-text"
                    style={{
                        opacity: 0.7,
                    }}
                >
                    Não há qualquer intenção comercial,
                    financeira ou distribuição de conteúdo
                    protegido por direitos autorais.
                </span>
            </div>

            <br />

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <span
                    className="crt-text"
                    style={{
                        opacity: 0.7,
                    }}
                >
                    As músicas utilizadas possuem apenas a
                    finalidade de compartilhar gostos musicais
                    pessoais e demonstrar funcionalidades do
                    projeto, sem qualquer incentivo à pirataria,
                    monetização ou redistribuição indevida.
                </span>
            </div>

            <br />

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <span
                    className="crt-text"
                    style={{
                        opacity: 0.7,
                    }}
                >
                    A interface visual utilizada foi inspirada
                    no software Sonique Media Player.
                </span>
            </div>

            <br />

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <a
                    href="https://www.ianlyman.com/portfolio/sonique-player-demo"
                    target="_blank"
                    rel="noreferrer"
                    className="crt-link"
                >
                    Referência visual do Sonique Player
                </a>
            </div>

            <div className="crt-line">
                <span className="crt-prompt">&gt;</span>

                <a
                    href="https://en.wikipedia.org/wiki/Sonique_(media_player)"
                    target="_blank"
                    rel="noreferrer"
                    className="crt-link"
                >
                    Wikipedia - Sonique Media Player
                </a>
            </div>

        </div>
    )
}