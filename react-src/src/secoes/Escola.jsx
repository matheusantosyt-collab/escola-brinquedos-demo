import BounceCards from '../rb/BounceCards/BounceCards'
import { Btn, IMG, Surge, Tinta, Uso, useLargura } from '../comum'

const FOTOS = [
  { src: IMG + 'pola1.webp', alt: 'Professora segurando as mãos de uma aluna pequena que se equilibra sobre uma linha no chão', legenda: 'De mãos dadas', cor: 'var(--verm)' },
  { src: IMG + 'pola2.webp', alt: 'Aluna fantasiada de fada com asas e borboletas amarelas', legenda: 'Faz de conta', cor: 'var(--azul)' },
  { src: IMG + 'pola3.webp', alt: 'Aluna de braços abertos se equilibrando sobre uma linha verde no chão', legenda: 'Equilíbrio', cor: '#a06c00' },
]

const ADESIVOS = [
  ['var(--verm)', '-3deg', '0s', undefined, 'Parque infantil', 'Brinquedos ao ar livre'],
  ['var(--azul)', '2deg', '-1s', '4px', 'Biblioteca', 'Com sala de leitura'],
  ['var(--amar)', '-2deg', '-2s', '50% 50% 0 0', 'Dois pátios', 'Coberto e descoberto', 'var(--tinta)'],
  ['#23824a', '3deg', '-3s', '4px 50%', 'Refeitório', 'Cozinha na escola'],
  ['var(--azul)', '-2deg', '-4s', undefined, 'Acessibilidade', 'Rampas e banheiro adaptado'],
  ['var(--verm)', '2deg', '-5s', '4px', 'Sala de recursos', 'Atendimento especializado'],
]

const QUADRAS = [
  { left: '4%', top: '8%', width: '22%', height: '30%' },
  { left: '30%', top: '8%', width: '24%', height: '30%', '--q': '#d9ecd0' },
  { left: '62%', top: '8%', width: '34%', height: '30%' },
  { left: '4%', top: '54%', width: '36%', height: '24%', '--q': '#d9ecd0' },
  { left: '44%', top: '54%', width: '20%', height: '24%' },
  { left: '68%', top: '54%', width: '28%', height: '24%', '--q': '#d9ecd0' },
]

function Varal() {
  const w = Math.min(useLargura() - 40, 1040)
  const card = Math.round(Math.min(260, Math.max(130, w * 0.3)))
  return (
    <div className="varal-rb">
      <svg className="fio" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 2Q50 18 100 2" />
      </svg>
      <BounceCards
        images={FOTOS}
        containerWidth={w}
        containerHeight={Math.round(card * 1.2)}
        cardSize={card}
        spread={Math.round(card * 0.95)}
        rotation={6}
        borderWidth={10}
        borderColor="#ffffff"
        radius={8}
        pushDistance={Math.round(card * 0.5)}
      />
      <ul className="legendas">
        {FOTOS.map((f) => (
          <li key={f.legenda} style={{ color: f.cor }}>
            {f.legenda}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Escola() {
  return (
    <section id="escola">
      <Tinta cor="var(--verm)" />
      <span className="giz g mo" style={{ '--w': '50px', '--c': 'var(--azul)', left: '3%', top: 150 }} data-fundo="-40">
        <Uso id="estrela" />
      </span>
      <div className="wrap">
        <Surge>
          <span className="casa" style={{ color: 'var(--verm)' }}>
            4
          </span>
          <h2>
            Espaço para brincar
            <br />e aprender.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Uma estrutura pensada para criança pequena, com lugar para correr, ler, comer bem e ser acolhida.
          </p>
        </Surge>
        <Varal />
        <Surge className="adesivos" stagger={0.08}>
          {ADESIVOS.map(([c, r, dl, f, titulo, sub, t]) => (
            <div className="ade" key={titulo} style={{ '--c': c, '--r': r, '--dl': dl, '--f': f, '--t': t }}>
              <i />
              <span>
                <b>{titulo}</b>
                <small>{sub}</small>
              </span>
            </div>
          ))}
        </Surge>
        <Surge>
          <div className="mapa" role="img" aria-label="Mapa ilustrativo com a localização da escola em Casa Amarela, Recife">
            {QUADRAS.map((q, i) => (
              <i key={i} className="quadra" style={q} />
            ))}
            <i className="rio" />
            <i className="rua" style={{ left: 0, right: 0, top: 'calc(46% - 10px)', height: 20 }} />
            <i className="rua" style={{ top: 0, bottom: 0, left: 'calc(27% - 8px)', width: 16 }} />
            <i className="rua" style={{ top: 0, bottom: 0, left: 'calc(58% - 8px)', width: 16 }} />
            <i className="carro" />
            <i className="onda" />
            <i className="pino" />
            <div className="ende vidro">
              <b>Rua Conselheiro Nabuco, 336 · Casa Amarela</b>
              <Btn
                className="btn sm amar"
                href="https://www.google.com/maps/search/?api=1&query=Rua+Conselheiro+Nabuco+336+Casa+Amarela+Recife"
                target="_blank"
                rel="noopener"
              >
                Ver no mapa ↗
              </Btn>
            </div>
            <span className="ilus">mapa ilustrativo</span>
          </div>
        </Surge>
      </div>
    </section>
  )
}
