import ScrollStack, { ScrollStackItem } from '../rb/ScrollStack/ScrollStack'
import { Surge, Tinta, Uso } from '../comum'

const CARTAS = [
  { n: 1, cor: 'var(--verm)', icone: <Uso id="menina" box="0 0 44 64" />, titulo: 'Educação Infantil', tag: 'Os primeiros anos',
    texto: 'Movimento, faz de conta e convivência. Cada conquista é acompanhada de perto pela professora.' },
  { n: 2, cor: 'var(--azul)', icone: <Uso id="menino" box="0 0 44 64" />, titulo: 'Ensino Fundamental I', tag: '1º ao 5º ano',
    texto: 'Leitura, escrita e raciocínio com base sólida, sem perder a curiosidade de quem aprende brincando.' },
  { n: 3, cor: 'var(--amar)', tinta: 'var(--tinta)', icone: <Uso id="catavento" className="gira" />, titulo: 'Brincar todo dia', tag: 'Na rotina',
    texto: 'Brinquedos pedagógicos, jogos educativos, parque e pátio fazem parte do dia de todas as turmas.' },
]

export default function Ensino() {
  return (
    <section id="ensino" className="ensino-pilha">
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
            A criança começa na Educação Infantil e segue até o fim do Fundamental I na mesma escola, com os mesmos amigos. Role e
            veja as cartas se empilharem.
          </p>
        </Surge>
        {/* Scroll Stack (React Bits): as cartas grudam no topo e se empilham conforme a página rola */}
        <ScrollStack
          useWindowScroll
          smoothScroll={false}
          stackPosition="16%"
          itemDistance={70}
          itemStackDistance={28}
          itemScale={0.04}
          baseScale={0.9}
          dimAmount={0.12}
          holdDistance={140}
        >
          {CARTAS.map((c) => (
            <ScrollStackItem key={c.n} itemClassName="carta-pilha" style={{ '--c': c.cor, '--t': c.tinta }}>
              <span className="carta-pilha__icone" aria-hidden="true">
                {c.icone}
              </span>
              <div>
                <small>carta {c.n} de 3</small>
                <span className="tag">{c.tag}</span>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
