import { useEffect, useReducer, useRef, useState } from 'react'
import ClickSpark from './rb/ClickSpark/ClickSpark'
import GradualBlur from './rb/GradualBlur/GradualBlur'
import { MODOS, topoNatural, useTransicoes } from './transicoes'
import Seletor from './secoes/Seletor'
import { DEFS } from './simbolos'
import { useGuardado } from './comum'
import { SEMENTE } from './lib/mural'
import { estadoMural, MURAL_INICIAL } from './lib/muralEstado'
import Doca from './secoes/Doca'
import Trilho from './secoes/Trilho'
import Inicio from './secoes/Inicio'
import Ensino from './secoes/Ensino'
import Familia from './secoes/Familia'
import Escola from './secoes/Escola'
import Mural from './secoes/Mural'
import Matricula from './secoes/Matricula'
import Rodape from './secoes/Rodape'
import Dialogos from './secoes/Dialogos'

/** Qual seção está no meio da tela: a última cujo topo já passou da metade (funciona com as seções presas). */
function useSecaoAtual() {
  const [secao, setSecao] = useState('inicio')
  useEffect(() => {
    let pedido = 0
    const mede = () => {
      pedido = 0
      let atual = 'inicio'
      document.querySelectorAll('main > section[id]').forEach((s) => {
        if (s.getBoundingClientRect().top <= window.innerHeight / 2) atual = s.id
      })
      setSecao(atual)
    }
    const agenda = () => pedido || (pedido = requestAnimationFrame(mede))
    addEventListener('scroll', agenda, { passive: true })
    addEventListener('resize', agenda)
    mede()
    return () => {
      removeEventListener('scroll', agenda)
      removeEventListener('resize', agenda)
      cancelAnimationFrame(pedido)
    }
  }, [])
  return secao
}

/** Links #secao rolam até o topo natural da seção (o sticky confundiria a rolagem padrão). */
function useLinksDeSecao() {
  useEffect(() => {
    const clique = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const y = topoNatural(a.getAttribute('href').slice(1))
      if (y == null) return
      e.preventDefault()
      window.scrollTo({ top: y + 1, behavior: 'smooth' })
    }
    document.addEventListener('click', clique, true)
    return () => document.removeEventListener('click', clique, true)
  }, [])
}

/** Modo de transição: ?transicao=portal|tinta|folhas no link, senão o último escolhido. */
function modoInicial() {
  const daUrl = new URLSearchParams(location.search).get('transicao')
  const ok = (m) => MODOS.some(([id]) => id === m)
  if (ok(daUrl)) return daUrl
  try {
    const salvo = localStorage.getItem('ebb_transicao')
    if (ok(salvo)) return salvo
  } catch {
    /* sem localStorage */
  }
  return 'portal'
}

/** Pausa as animações das seções fora da tela (classe .off do CSS original). */
function usePausaForaDaTela() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('off', !e.isIntersecting)), {
      rootMargin: '120px 0px',
    })
    document.querySelectorAll('main section, footer').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
}

/** Giz e foto do topo acompanham o mouse e a rolagem (como na versão HTML). */
function useParalaxe() {
  useEffect(() => {
    const fundos = [...document.querySelectorAll('[data-fundo]')]
    let mx = 0, my = 0, tx = 0, ty = 0, rodando = false
    const quadro = () => {
      tx += (mx - tx) * 0.07
      ty += (my - ty) * 0.07
      const vh = innerHeight
      fundos.forEach((d) => {
        const s = d.closest('section')
        if (s?.classList.contains('off')) return
        const k = +d.dataset.fundo
        const r = (s || d).getBoundingClientRect()
        const sc = (r.top + r.height / 2 - vh / 2) / vh
        d.style.translate = `${(tx * k).toFixed(1)}px ${(ty * k - sc * k * 1.2).toFixed(1)}px`
      })
      if (Math.abs(mx - tx) > 0.002 || Math.abs(my - ty) > 0.002) requestAnimationFrame(quadro)
      else rodando = false
    }
    const acorda = () => {
      if (!rodando) {
        rodando = true
        requestAnimationFrame(quadro)
      }
    }
    const move = (e) => {
      mx = e.clientX / innerWidth - 0.5
      my = e.clientY / innerHeight - 0.5
      acorda()
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('scroll', acorda, { passive: true })
    acorda()
    return () => {
      removeEventListener('pointermove', move)
      removeEventListener('scroll', acorda)
    }
  }, [])
}

export default function App() {
  const secao = useSecaoAtual()
  useLinksDeSecao()
  const [modo, setModo] = useState(modoInicial)
  useTransicoes(modo)
  const trocaModo = (m) => {
    setModo(m)
    try {
      localStorage.setItem('ebb_transicao', m)
    } catch {
      /* sem localStorage */
    }
    const url = new URL(location.href)
    url.searchParams.set('transicao', m)
    history.replaceState(null, '', url)
  }
  usePausaForaDaTela()
  useParalaxe()
  const [recados, setRecados] = useGuardado('ebb_recados', SEMENTE)
  const [contatos, setContatos] = useGuardado('ebb_contatos', [])
  const [mural, despacha] = useReducer(estadoMural, MURAL_INICIAL)
  const dialogos = useRef(null)
  const abreLogin = (perfil) => dialogos.current.login(perfil)
  const abrePrivacidade = () => dialogos.current.privacidade()

  return (
    <ClickSpark sparkColor="#ffc928" sparkSize={12} sparkRadius={26} sparkCount={10} duration={450}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs dangerouslySetInnerHTML={{ __html: DEFS }} />
      </svg>
      <Trilho secao={secao} />
      <Doca secao={secao} onEntrar={() => abreLogin()} />
      <main>
        <Inicio />
        <Ensino />
        <Familia />
        <Escola />
        <Mural
          recados={recados}
          filtro={mural.filtro}
          novo={mural.novo}
          onFiltrar={(filtro) => despacha({ tipo: 'filtrar', filtro })}
          onPublicar={() => abreLogin('secretaria')}
        />
        <Matricula onContato={(c) => setContatos((l) => [...l, c])} onPrivacidade={abrePrivacidade} />
      </main>
      <Rodape onLogin={abreLogin} onPrivacidade={abrePrivacidade} />
      <a
        className="zap"
        href="https://wa.me/5581989574792?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita."
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.7-.1-1.6-.5-3.5-1.5-5.2-4.2-1.2-1.8-1.3-3.2-.3-4.3.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2 0 .4-.1.6l-.7.9c.7 1.3 1.8 2.3 3.2 2.9l.9-1c.2-.2.4-.2.6-.1l2 1c.2.1.4.2.4.3 0 .2 0 .4-.2.6z" />
        </svg>
      </a>
      <Seletor modo={modo} onModo={trocaModo} />
      {/* desfoque sutil no pé da tela (Gradual Blur, React Bits) */}
      <GradualBlur target="page" position="bottom" height="5.5rem" strength={1.2} layers={6} curve="bezier" zIndex={50} />
      <Dialogos
        ref={dialogos}
        recados={recados}
        setRecados={setRecados}
        contatos={contatos}
        onPublicado={(id) => {
          despacha({ tipo: 'publicado', id })
          window.scrollTo({ top: topoNatural('mural') + 1, behavior: 'smooth' })
        }}
      />
    </ClickSpark>
  )
}
