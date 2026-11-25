import CountUp from '../rb/CountUp/CountUp'
import LogoLoop from '../rb/LogoLoop/LogoLoop'
import { Btn, Surge, Uso, useLargura } from '../comum'

const NUMEROS = [
  [26, 'anos de história'],
  [181, 'alunos matriculados'],
  [11, 'professores'],
]

// tamanho explícito: o LogoLoop mede a largura de cada item para montar o laço
const criancas = (h) =>
  Array.from({ length: 12 }, (_, i) => ({
    node: <Uso id={i % 2 ? 'menino' : 'menina'} box="0 0 44 64" style={{ height: h, width: Math.round((h * 44) / 64) }} />,
  }))

export default function Familia() {
  const w = useLargura()
  const altura = w < 600 ? 64 : w < 980 ? 84 : 104
  return (
    <section className="familia" id="familia">
      <span className="giz g mo" style={{ '--w': '60px', '--c': 'var(--amar)', right: '6%', top: 70 }} data-fundo="45">
        <Uso id="estrela" />
      </span>
      <div className="wrap">
        <div className="cabeca">
          <Surge>
            <span className="casa">3</span>
            <h2>
              Uma grande família
              <br />
              desde 2000.
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Escola de bairro, onde todo mundo se conhece pelo nome.
            </p>
          </Surge>
          <Surge delay={0.2}>
            <Btn className="btn amar" href="#matricula">
              Quero fazer parte
            </Btn>
          </Surge>
        </div>
        <Surge className="contas" stagger={0.11}>
          {NUMEROS.map(([n, rotulo]) => (
            <div className="conta" key={rotulo}>
              <div className="odo">
                <CountUp to={n} duration={2.4} />
              </div>
              <span>{rotulo}</span>
            </div>
          ))}
        </Surge>
        <p className="nota-fonte">Alunos e professores: Censo Escolar 2024 (Inep). Fundação em 2000, conforme registro da empresa.</p>
      </div>
      <div className="corrente" aria-hidden="true" style={{ height: altura }}>
        <LogoLoop
          logos={criancas(altura)}
          speed={55}
          logoHeight={altura}
          gap={2}
          fadeOut={false}
          draggable={false}
          intro={false}
          ariaLabel="Crianças marchando"
        />
      </div>
    </section>
  )
}
