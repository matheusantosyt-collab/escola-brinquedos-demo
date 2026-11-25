import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Uso } from '../comum'
import { hoje } from '../lib/datas'

const PERFIS = [
  ['familia', 'Família', 'Agenda, recados e financeiro', 'var(--verm)', 'menina'],
  ['professor', 'Professor', 'Diário de classe e recados', 'var(--azul)', 'menino'],
  ['secretaria', 'Secretaria', 'Mural e contatos recebidos', '#a06c00', 'menina'],
]

/** Fecha o <dialog> ao clicar no fundo escurecido. */
const fundo = (e) => e.target === e.currentTarget && e.currentTarget.close()

const Cabeca = ({ children }) => (
  <div className="dc">
    {children}
    <button className="x" type="button" aria-label="Fechar" onClick={(e) => e.currentTarget.closest('dialog').close()}>
      ✕
    </button>
  </div>
)

const Dialogos = forwardRef(function Dialogos({ recados, setRecados, contatos, onPublicado }, ref) {
  const login = useRef(null)
  const priv = useRef(null)
  const [passo, setPasso] = useState('perfil')
  const [r, setR] = useState({ tipo: 'noticia', titulo: '', data: hoje(), texto: '' })

  const entra = (p) => setPasso(p === 'secretaria' ? 'cms' : p)
  useImperativeHandle(ref, () => ({
    login(perfil) {
      perfil ? entra(perfil) : setPasso('perfil')
      if (!login.current.open) login.current.showModal()
    },
    privacidade() {
      if (!priv.current.open) priv.current.showModal()
    },
  }))

  function publica(e) {
    e.preventDefault()
    const novo = { id: 'r' + Date.now(), tipo: r.tipo, titulo: r.titulo.trim(), data: r.data, texto: r.texto.trim() }
    if (!novo.titulo || !novo.data || !novo.texto) return
    setRecados([...recados, novo])
    setR({ tipo: 'noticia', titulo: '', data: novo.data, texto: '' })
    login.current.close()
    onPublicado(novo.id)
  }

  const muda = (k) => (e) => setR({ ...r, [k]: e.target.value })
  const trocar = (
    <p style={{ marginTop: 22 }}>
      <button className="liso sm" type="button" onClick={() => setPasso('perfil')}>
        Trocar de perfil
      </button>
    </p>
  )

  return (
    <>
      <dialog ref={login} aria-labelledby="loginTitulo" onClick={fundo}>
        <Cabeca>
          <span className="url">
            🔒 <b>entrar.</b>escolabb.com.br
          </span>
        </Cabeca>
        <div className="dcorpo">
          {passo === 'perfil' && (
            <div>
              <h3 id="loginTitulo">Um login para tudo</h3>
              <p className="fraco" style={{ marginTop: 6 }}>
                Na versão final, a pessoa entra uma vez no domínio da escola e chega a tudo sem digitar outra senha. Nesta demonstração,
                escolha um perfil.
              </p>
              <div className="perfis">
                {PERFIS.map(([id, nome, desc, cor, icone]) => (
                  <button key={id} type="button" className="perfil" style={{ '--c': cor }} onClick={() => entra(id)}>
                    <Uso id={icone} box="0 0 44 64" />
                    <b>{nome}</b>
                    <span>{desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {(passo === 'familia' || passo === 'professor') && (
            <div>
              <h3 id="loginTitulo">{passo === 'professor' ? 'Olá, professor(a)!' : 'Olá, família!'}</h3>
              <p className="fraco" style={{ marginTop: 6 }}>
                Sessão única ativa. Os módulos abaixo fazem parte da proposta.
              </p>
              <div className="modulos">
                <div className="modulo">
                  <b>Agenda digital <span className="prop">proposta</span></b>
                  <span>Recados, fotos do dia e calendário da turma</span>
                </div>
                <div className="modulo">
                  <b>Boletim e financeiro <span className="prop">proposta</span></b>
                  <span>Acompanhamento, boletos e segunda via</span>
                </div>
              </div>
              {trocar}
            </div>
          )}
          {passo === 'cms' && (
            <div>
              <h3 id="loginTitulo">Painel da secretaria</h3>
              <p className="fraco" style={{ marginTop: 6 }}>
                Escreva um recado e veja ser colado no mural na hora.
              </p>
              <div className="cms">
                <form onSubmit={publica}>
                  <label className="c" htmlFor="cTipo">
                    Tipo
                    <select id="cTipo" value={r.tipo} onChange={muda('tipo')}>
                      <option value="noticia">Notícia</option>
                      <option value="evento">Evento</option>
                    </select>
                  </label>
                  <label className="c" htmlFor="cTitulo">
                    Título
                    <input id="cTitulo" type="text" maxLength={60} required value={r.titulo} onChange={muda('titulo')} />
                  </label>
                  <label className="c" htmlFor="cData">
                    Data
                    <input id="cData" type="date" required value={r.data} onChange={muda('data')} />
                  </label>
                  <label className="c" htmlFor="cTexto">
                    Resumo
                    <textarea id="cTexto" rows={3} maxLength={160} required value={r.texto} onChange={muda('texto')} />
                  </label>
                  <button className="btn sm" type="submit">
                    Colar no mural
                  </button>
                </form>
                <div>
                  <b>No mural</b>
                  <div className="lista" style={{ marginTop: 10 }}>
                    {recados.map((x) => (
                      <div key={x.id}>
                        <span>{x.titulo}</span>
                        <button type="button" onClick={() => setRecados(recados.filter((y) => y.id !== x.id))}>
                          Tirar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h3 style={{ marginTop: 28 }}>Contatos recebidos pelo formulário</h3>
              <div className="rola" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Protocolo</th><th>Nome</th><th>WhatsApp</th><th>Etapa</th><th>Horário</th><th>Novidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contatos.length === 0 ? (
                      <tr>
                        <td className="fraco" colSpan={6}>
                          Nenhum contato ainda. Envie o formulário de visita para ver aqui.
                        </td>
                      </tr>
                    ) : (
                      [...contatos].reverse().map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td><td>{c.nome}</td><td>{c.tel}</td><td>{c.etapa}</td><td>{c.turno}</td><td>{c.novas ? 'Sim' : 'Não'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {trocar}
            </div>
          )}
        </div>
      </dialog>

      <dialog ref={priv} aria-labelledby="privTitulo" onClick={fundo}>
        <Cabeca>
          <b id="privTitulo" style={{ font: '400 1.3rem var(--display)' }}>
            Política de Privacidade (resumo)
          </b>
        </Cabeca>
        <div className="dcorpo">
          <p><b>O que coletamos:</b> nome, WhatsApp, etapa de interesse e horário preferido.</p>
          <p style={{ marginTop: 10 }}><b>Para quê:</b> retornar o pedido de visita. Novidades só são enviadas a quem marcou a opção.</p>
          <p style={{ marginTop: 10 }}><b>Seus direitos:</b> você pode pedir acesso, correção ou exclusão pelo WhatsApp ou telefone da escola.</p>
          <p className="fraco" style={{ marginTop: 14 }}>
            Texto de exemplo. A versão final é redigida com a escola e registra data, hora e versão do consentimento de cada contato.
          </p>
        </div>
      </dialog>
    </>
  )
})

export default Dialogos
