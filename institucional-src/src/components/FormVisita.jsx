import { useState } from 'react'
// mesma lógica testada da versão React (máscara, validação e mensagem do WhatsApp)
import { formataTelefone, validaVisita, mensagemZap, linkZap } from '../../../react-src/src/lib/visita.js'

const CAMPO_DO_ERRO = {
  'Informe seu nome.': 'vNome',
  'Informe um WhatsApp com DDD.': 'vTel',
  'Escolha a etapa de interesse.': 'vEtapa',
}

export default function FormVisita({ privacidade }) {
  const [f, setF] = useState({ nome: '', tel: '', etapa: '', turno: 'Manhã', lgpd: false, novas: false })
  const [erro, setErro] = useState('')
  const [feito, setFeito] = useState(null)
  const muda = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  function envia(e) {
    e.preventDefault()
    const msg = validaVisita(f)
    if (msg) {
      setErro(msg)
      document.getElementById(CAMPO_DO_ERRO[msg] || 'vLgpd')?.focus()
      return
    }
    setErro('')
    const c = { id: 'EBB-' + String(Date.now()).slice(-6), nome: f.nome.trim(), tel: f.tel, etapa: f.etapa, turno: f.turno, novas: f.novas, aceite: new Date().toISOString(), politica: 'v1' }
    // protótipo: guarda no navegador (mesma chave do demo); no site real vai para o servidor da escola
    try {
      const lista = JSON.parse(localStorage.getItem('ebb_contatos') || '[]')
      localStorage.setItem('ebb_contatos', JSON.stringify([...lista, c]))
    } catch {
      /* sem localStorage */
    }
    const url = linkZap(mensagemZap(c))
    setFeito({ ...c, url })
    try {
      window.open(url, '_blank', 'noopener')
    } catch {
      /* bloqueado: o botão abaixo resolve */
    }
  }

  if (feito)
    return (
      <div className="form-visita feito" role="status">
        <div className="ok">✓</div>
        <h3>Pedido recebido, {feito.nome.split(' ')[0]}!</h3>
        <p>
          Protocolo <b>{feito.id}</b>. A secretaria confirma o horário pelo WhatsApp. Se ele não abriu sozinho, use o botão.
        </p>
        <a className="btn" href={feito.url} target="_blank" rel="noopener">
          Abrir o WhatsApp
        </a>
      </div>
    )

  return (
    <div className="form-visita">
      <form onSubmit={envia} noValidate>
        <h3>Agende uma visita</h3>
        <div className="par">
          <label className="campo" htmlFor="vNome">
            Seu nome
            <input id="vNome" type="text" autoComplete="name" value={f.nome} onChange={muda('nome')} />
          </label>
          <label className="campo" htmlFor="vTel">
            WhatsApp
            <input id="vTel" type="tel" inputMode="tel" autoComplete="tel" placeholder="(81) 90000-0000" value={f.tel}
              onChange={(e) => setF({ ...f, tel: formataTelefone(e.target.value) })} />
          </label>
        </div>
        <div className="par">
          <label className="campo" htmlFor="vEtapa">
            Etapa de interesse
            <select id="vEtapa" value={f.etapa} onChange={muda('etapa')}>
              <option value="">Selecione</option>
              <option>Educação Infantil</option>
              <option>Ensino Fundamental I</option>
            </select>
          </label>
          <label className="campo" htmlFor="vTurno">
            Melhor horário
            <select id="vTurno" value={f.turno} onChange={muda('turno')}>
              <option>Manhã</option>
              <option>Tarde</option>
            </select>
          </label>
        </div>
        <label className="aceite" htmlFor="vLgpd">
          <input id="vLgpd" type="checkbox" checked={f.lgpd} onChange={muda('lgpd')} />
          <span>
            Autorizo a escola a usar meus dados para retornar este contato, conforme a <a href={privacidade}>Política de Privacidade</a> (LGPD).
          </span>
        </label>
        <label className="aceite" htmlFor="vNovas">
          <input id="vNovas" type="checkbox" checked={f.novas} onChange={muda('novas')} />
          <span>Quero receber novidades e eventos da escola. Opcional.</span>
        </label>
        <p className="erro" role="alert">
          {erro}
        </p>
        <button className="btn" type="submit">
          Enviar e abrir o WhatsApp
        </button>
      </form>
    </div>
  )
}
