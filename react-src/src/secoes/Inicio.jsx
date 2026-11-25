import SplitText from '../rb/SplitText/SplitText'
import Magnet from '../rb/Magnet/Magnet'
import { Btn, IMG, Uso } from '../comum'

const ALTURAS = [11.3, 17.5, 23.1, 28.1, 32.4, 36.1, 39.2, 41.7, 43.6, 44.8, 45.4, 45.4, 44.8, 43.6, 41.7, 39.2, 36.1, 32.4, 28.1, 23.1, 17.5, 11.3]
const CORES = ['#e02229', '#ffc928', '#ffffff', '#8ed0ff']

const Varalzinho = () => (
  <div className="varalzinho" aria-hidden="true">
    <svg viewBox="0 0 1600 110">
      <path d="M0 8Q800 83 1600 8" fill="none" stroke="#fff" strokeWidth="3" />
      {ALTURAS.map((y, i) => (
        <g key={i} transform={`translate(${(36.4 + i * 72.727).toFixed(1)} ${y})`}>
          <path className="band" style={{ '--dl': (-0.31 * i).toFixed(2) + 's' }} d="M-26 0h52L0 52z" fill={CORES[i % 4]} />
        </g>
      ))}
    </svg>
  </div>
)

const BLOCOS = [
  ['B', '#e02229', '#fff', '-4deg'], ['R', '#ffc928', '#141a4d', '3deg'], ['I', '#fff', '#1c2dae', '-2deg'],
  ['N', '#8ed0ff', '#141a4d', '4deg'], ['C', '#e02229', '#fff', '-3deg'], ['A', '#ffc928', '#141a4d', '2deg'], ['R', '#fff', '#e02229', '-4deg'],
]

const titulo = { splitType: 'chars', textAlign: 'left', tag: 'span', duration: 0.9, delay: 30, threshold: 0, rootMargin: '0px' }

export default function Inicio() {
  return (
    <section className="inicio" id="inicio">
      <Varalzinho />
      <span className="giz g mo" style={{ '--w': '54px', '--c': 'var(--amar)', left: '44%', bottom: 120 }} data-fundo="40">
        <Uso id="estrela" />
      </span>
      <span className="giz mo" style={{ '--w': '60px', '--c': '#8ea0ff', left: '3%', top: '42%' }} data-fundo="-30">
        <Uso id="espiral" />
      </span>
      <div className="wrap topo">
        <div>
          <span className="selo vidro">
            <i>★</i>Matrículas 2027 abertas
          </span>
          <div className="blocos" aria-hidden="true">
            {BLOCOS.map(([l, c, t, r], i) => (
              <i key={i} style={{ '--c': c, '--t': t, '--r': r, '--i': i }}>
                {l}
              </i>
            ))}
          </div>
          <h1>
            <span className="sr-only">Brincar </span>
            <SplitText {...titulo} text="é o jeito mais" />{' '}
            <SplitText {...titulo} tag="em" text="divertido" delay={45} />{' '}
            <SplitText {...titulo} text="de aprender." />
          </h1>
          <p className="lead">Educação Infantil e Ensino Fundamental I em Casa Amarela, no Recife. Uma grande família desde 2000.</p>
          <div className="acoes">
            <Magnet padding={70} magnetStrength={3}>
              <Btn href="#matricula">Agendar uma visita</Btn>
            </Magnet>
            <a className="liso" href="#escola">
              Conhecer a escola →
            </a>
          </div>
          <div className="fatos">
            <span>
              <b>Rua Conselheiro Nabuco, 336</b> · Casa Amarela
            </span>
            <span>
              Telefone <b>(81) 3265-2783</b>
            </span>
          </div>
        </div>
        <div className="janela" data-fundo="-14">
          <div className="raios" aria-hidden="true" />
          <div className="arco">
            <img
              src={IMG + 'hero.webp'}
              alt="Aluno com o uniforme da escola na campanha Matrículas 2027 abertas: faça parte desta grande família"
            />
          </div>
          <div className="orbita" aria-hidden="true">
            <span>
              <Uso id="bola" />
            </span>
          </div>
          <div className="orbita b" aria-hidden="true">
            <span style={{ '--w': '50px' }}>
              <Uso id="catavento" />
            </span>
          </div>
          <div className="ficha vidro a">
            <b>2000</b>ano em que tudo começou
          </div>
          <div className="ficha vidro b">
            <b>2 etapas</b>Infantil e Fundamental I
          </div>
        </div>
      </div>
    </section>
  )
}
