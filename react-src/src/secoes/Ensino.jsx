import { useState } from 'react'
import { Surge, Tinta, Uso } from '../comum'

const CARTAS = [
  { n: 1, cor: 'var(--verm)', dl: '0s', icone: <Uso id="menina" box="0 0 44 64" />, titulo: 'Educação Infantil', tag: 'Os primeiros anos',
    texto: 'Movimento, faz de conta e convivência. Cada conquista é acompanhada de perto pela professora.' },
  { n: 2, cor: 'var(--azul)', dl: '-2.6s', icone: <Uso id="menino" box="0 0 44 64" />, titulo: 'Ensino Fundamental I', tag: '1º ao 5º ano',
    texto: 'Leitura, escrita e raciocínio com base sólida, sem perder a curiosidade de quem aprende brincando.' },
  { n: 3, cor: 'var(--amar)', tinta: 'var(--tinta)', dl: '-5.2s', icone: <Uso id="catavento" style={{ animation: 'gira 6s linear infinite' }} />,
    titulo: 'Brincar todo dia', tag: 'Na rotina',
    texto: 'Brinquedos pedagógicos, jogos educativos, parque e pátio fazem parte do dia de todas as turmas.' },
]

function Carta({ c }) {
  const [aberta, setAberta] = useState(false)
  return (
    <button
      type="button"
      className={'carta' + (aberta ? ' aberta' : '')}
      style={{ '--c': c.cor, '--t': c.tinta, '--dl': c.dl }}
      aria-pressed={aberta}
      aria-labelledby={`c${c.n}t`}
      aria-describedby={`c${c.n}d`}
      onClick={() => setAberta((a) => !a)}
    >
      <span className="dentro">
        <span className="face frente" aria-hidden="true">
          {c.icone}
          <span>
            <small>carta {c.n} · vire</small>
            <span className="t">{c.titulo}</span>
          </span>
        </span>
        <span className="face verso">
          <span className="tag">{c.tag}</span>
          <span className="t" id={`c${c.n}t`}>
            {c.titulo}
          </span>
          <span className="p" id={`c${c.n}d`}>
            {c.texto}
          </span>
        </span>
      </span>
    </button>
  )
}

export default function Ensino() {
  return (
    <section id="ensino">
      <Tinta cor="var(--azul)" />
      <span className="giz mo" style={{ '--w': '70px', '--c': 'var(--verm)', right: '4%', top: 120 }} data-fundo="50">
        <Uso id="espiral" />
      </span>
      <div className="wrap">
        <Surge>
          <span className="casa" style={{ color: 'var(--azul)' }}>
            2
          </span>
          <h2>
            Do primeiro passo
            <br />
            ao 5º ano.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            A criança começa na Educação Infantil e segue até o fim do Fundamental I na mesma escola, com os mesmos amigos. Vire as
            cartas.
          </p>
        </Surge>
        <Surge className="memo" stagger={0.11}>
          {CARTAS.map((c) => (
            <Carta key={c.n} c={c} />
          ))}
        </Surge>
      </div>
    </section>
  )
}
