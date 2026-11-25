import { useState } from 'react'
import { Btn, Surge, Uso } from '../comum'
import { formataTelefone, validaVisita, mensagemZap, linkZap } from '../lib/visita'
import { soltaBaloes } from '../lib/baloes'

const PASSOS = ['Preencha o formulário', 'A secretaria recebe o contato', 'Converse pelo WhatsApp']

export default function Matricula({ onContato, onPrivacidade }) {
  const [f, setF] = useState({ nome: '', tel: '', etapa: '', turno: 'Manhã', lgpd: false, novas: false })
  const [erro, setErro] = useState('')
  const [feito, setFeito] = useState(null)
  const muda = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  function envia(e) {
    e.preventDefault()
    const msg = validaVisita(f)
    if (msg) {
      setErro(msg)
      const campo = { 'Informe seu nome.': 'fNome', 'Informe um WhatsApp com DDD.': 'fTel', 'Escolha a etapa de interesse.': 'fEtapa' }[msg] || 'fLgpd'
      document.getElementById(campo)?.focus()
      return
    }
    setErro('')
    const c = { id: 'EBB-' + String(Date.now()).slice(-6), nome: f.nome.trim(), tel: f.tel, etapa: f.etapa, turno: f.turno, novas: f.novas, aceite: new Date().toISOString(), politica: 'v1' }
    onContato(c)
    const url = linkZap(mensagemZap(c))
    setFeito({ ...c, url })
    soltaBaloes(30)
    try {
      window.open(url, '_blank', 'noopener')
    } catch {
      /* bloqueado: o botão abaixo resolve */
    }
  }

  return (
    <section className="ceu" id="matricula">
      <i className="nuvem" style={{ '--y': '60px', '--t': '46s', '--dl': '-8s' }} />
      <i className="nuvem" style={{ '--y': '210px', '--t': '64s', '--dl': '-36s', '--w': '12%' }} />
      <i className="nuvem" style={{ '--y': '420px', '--t': '54s', '--dl': '-22s', '--w': '14%' }} />
      <span className="pipa" aria-hidden="true">
        <Uso id="pipa" box="0 0 40 62" />
      </span>
      <div className="wrap matri">
        <div>
          <Surge>
            <span className="casa" style={{ color: 'var(--azul)', width: 'auto', padding: '0 14px', borderRadius: '10px 10px 40px 40px' }}>
              céu
            </span>
            <h2>
              Chegou ao céu:
              <br />
              hora da matrícula.
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Faça parte desta grande família! São três pulinhos, e a conversa continua pelo WhatsApp.
            </p>
          </Surge>
          <Surge className="amarelinha">
            <span className="salta" aria-hidden="true">
              <Uso id="menina" box="0 0 44 64" />
            </span>
            {PASSOS.map((p, i) => (
              <div key={p}>
                <b>{i + 1}</b>
                <span>{p}</span>
              </div>
            ))}
            <div>
              <b>céu!</b>
            </div>
          </Surge>
        </div>
        <Surge delay={0.15}>
          <div className="cartao vidro">
            {!feito ? (
              <form onSubmit={envia} noValidate>
                <h3>Quero agendar uma visita</h3>
                <div className="par">
                  <label className="c" htmlFor="fNome">
                    Seu nome
                    <input id="fNome" type="text" autoComplete="name" required value={f.nome} onChange={muda('nome')} />
                  </label>
                  <label className="c" htmlFor="fTel">
                    WhatsApp
                    <input id="fTel" type="tel" inputMode="tel" autoComplete="tel" placeholder="(81) 90000-0000" required
                      value={f.tel} onChange={(e) => setF({ ...f, tel: formataTelefone(e.target.value) })} />
                  </label>
                </div>
                <div className="par">
                  <label className="c" htmlFor="fEtapa">
                    Etapa de interesse
                    <select id="fEtapa" required value={f.etapa} onChange={muda('etapa')}>
                      <option value="">Selecione</option>
                      <option>Educação Infantil</option>
                      <option>Ensino Fundamental I</option>
                    </select>
                  </label>
                  <label className="c" htmlFor="fTurno">
                    Melhor horário
                    <select id="fTurno" value={f.turno} onChange={muda('turno')}>
                      <option>Manhã</option>
                      <option>Tarde</option>
                    </select>
                  </label>
                </div>
                <label className="aceite" htmlFor="fLgpd">
                  <input id="fLgpd" type="checkbox" required checked={f.lgpd} onChange={muda('lgpd')} />
                  <span>
                    Autorizo a Escola Brinquedos e Brincadeiras a usar meus dados para retornar este contato, conforme a{' '}
                    <a href="#privacidade" onClick={(e) => { e.preventDefault(); onPrivacidade() }}>
                      Política de Privacidade
                    </a>{' '}
                    (LGPD).
                  </span>
                </label>
                <label className="aceite" htmlFor="fNovas">
                  <input id="fNovas" type="checkbox" checked={f.novas} onChange={muda('novas')} />
                  <span>Quero receber novidades e eventos da escola. Opcional.</span>
                </label>
                <p className="erro" role="alert">
                  {erro}
                </p>
                <Btn type="submit">Enviar e abrir o WhatsApp</Btn>
              </form>
            ) : (
              <div className="feito on">
                <div className="ok">✓</div>
                <h3>Contato registrado, {feito.nome.split(' ')[0]}!</h3>
                <p>
                  Protocolo <b>{feito.id}</b>. Se o WhatsApp não abriu sozinho, use o botão.
                </p>
                <Btn href={feito.url} target="_blank" rel="noopener">
                  Abrir o WhatsApp
                </Btn>
              </div>
            )}
          </div>
        </Surge>
      </div>
      <i className="grama" aria-hidden="true" />
    </section>
  )
}
