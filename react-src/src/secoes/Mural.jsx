import { Btn, Surge, Uso } from '../comum'
import { ordenaRecados } from '../lib/mural'
import { hoje, diaCurto } from '../lib/datas'

const FILTROS = [
  ['todos', 'Tudo'],
  ['noticia', 'Notícias'],
  ['evento', 'Eventos'],
]
const PAPEIS = ['#fff', '#fff3b0', '#ffdfe1']
const GIROS = ['-3deg', '2deg', '-1.5deg', '3deg']

export default function Mural({ recados, filtro, novo, onFiltrar, onPublicar }) {
  const lista = ordenaRecados(recados, filtro, hoje())
  return (
    <section className="mural" id="mural">
      <span className="giz mo" style={{ '--w': '64px', '--c': 'var(--amar)', right: '5%', bottom: 60 }} data-fundo="50">
        <Uso id="espiral" />
      </span>
      <div className="wrap">
        <div className="cabeca">
          <Surge>
            <span className="casa" style={{ color: 'var(--amar)' }}>
              5
            </span>
            <h2>Mural da escola.</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Notícias e eventos que a secretaria cola aqui, sem depender de programador.
            </p>
          </Surge>
          <div className="abas" role="group" aria-label="Filtrar recados">
            {FILTROS.map(([id, rotulo]) => (
              <button key={id} type="button" aria-pressed={filtro === id} onClick={() => onFiltrar(id)}>
                {rotulo}
              </button>
            ))}
          </div>
        </div>
        <div className="notas">
          {lista.length === 0 && <p className="fraco">Nenhum recado nesta categoria.</p>}
          {lista.map((r, i) => (
            <article
              key={r.id}
              className={'nota' + (r.id === novo ? ' nova' : '')}
              style={{ '--p': PAPEIS[i % 3], '--r': GIROS[i % 4], '--dl': -i * 1.3 + 's' }}
            >
              <div className="meta">
                <span className={'tipo ' + r.tipo}>{r.tipo === 'evento' ? 'Evento' : 'Notícia'}</span>
                <time dateTime={r.data}>{diaCurto(r.data)}</time>
                {r.ex && <span className="ex">exemplo</span>}
              </div>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </article>
          ))}
        </div>
        <div className="dica">
          <span>Quer ver como a secretaria publica?</span>
          <Btn className="btn sm amar" type="button" onClick={onPublicar}>
            Colar um recado no mural
          </Btn>
        </div>
      </div>
    </section>
  )
}
