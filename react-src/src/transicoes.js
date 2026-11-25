import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const MODOS = [
  ['portal', 'Portal'],
  ['tinta', 'Tinta'],
  ['folhas', 'Folhas'],
]

/** Cor de fundo de cada seção, usada pela tinta que inunda a tela antes da próxima. */
const COR = { ensino: '#fff6e6', familia: '#e02229', escola: '#fff6e6', mural: '#0e1663', matricula: '#aedcff' }

const secoes = () => [...document.querySelectorAll('main > section')]

/** Topo "natural" da seção (sem o efeito do sticky), para navegar pelos links do menu. */
export function topoNatural(id) {
  const lista = secoes()
  const main = document.querySelector('main')
  let y = main.getBoundingClientRect().top + window.scrollY
  for (const s of lista) {
    if (s.id === id) return y
    y += s.offsetHeight
  }
  return null
}

/**
 * Transições entre seções. Todas usam a mesma base: cada seção fica "presa" (sticky) quando o
 * fim dela chega ao pé da tela, e a seção seguinte sobe por cima. O modo decide como a de cima entra:
 * - portal: a próxima se abre num círculo a partir do número da amarelinha;
 * - tinta: tinta com a cor da próxima escorre do topo e inunda a tela;
 * - folhas: a próxima desliza como uma folha, e a de baixo encolhe e escurece.
 */
export function useTransicoes(modo) {
  useLayoutEffect(() => {
    const lista = secoes()
    const html = document.documentElement
    html.dataset.transicao = modo

    // sticky: a seção gruda quando o fim dela encosta no pé da tela
    const prende = () => lista.forEach((s) => (s.style.top = Math.min(0, window.innerHeight - s.offsetHeight) + 'px'))
    // (sem o top: com position relative ele deslocaria a seção)
    const solta = () => lista.forEach((s) => Object.assign(s.style, { position: 'relative', top: '' }))
    const volta = () => {
      lista.forEach((s) => (s.style.position = ''))
      prende()
    }
    prende()
    // o ScrollTrigger mede posições sem o sticky, senão erra o início de cada transição
    ScrollTrigger.addEventListener('refreshInit', solta)
    ScrollTrigger.addEventListener('refresh', volta)
    let espera = 0
    const ro = new ResizeObserver(() => {
      prende()
      clearTimeout(espera)
      espera = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    lista.forEach((s) => ro.observe(s))

    const criados = []
    const ctx = gsap.context(() => {
      lista.forEach((s, i) => {
        if (i === 0) return
        const ant = lista[i - 1]
        const passagem = { trigger: s, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true }
        const conteudoAnt = ant.querySelector(':scope > .wrap')

        if (modo === 'portal') {
          const casa = s.querySelector('.casa')
          const origem = () => {
            const r = s.getBoundingClientRect()
            const c = casa ? casa.getBoundingClientRect() : r
            return [c.left - r.left + c.width / 2, c.top - r.top + c.height / 2]
          }
          const raio = () => {
            const [x, y] = origem()
            return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) * 1.15
          }
          gsap.fromTo(
            s,
            { clipPath: () => { const [x, y] = origem(); return `circle(0px at ${x}px ${y}px)` } },
            { clipPath: () => { const [x, y] = origem(); return `circle(${raio()}px at ${x}px ${y}px)` }, ease: 'power2.in', scrollTrigger: passagem }
          )
          if (conteudoAnt) gsap.to(conteudoAnt, { y: -90, scale: 0.96, opacity: 0.35, ease: 'none', scrollTrigger: passagem })
        }

        if (modo === 'tinta') {
          const onda = document.createElement('div')
          onda.className = 'inundacao'
          onda.setAttribute('aria-hidden', 'true')
          onda.style.setProperty('--prox', COR[s.id] || '#fff6e6')
          onda.innerHTML = '<i></i>'
          ant.appendChild(onda)
          criados.push(onda)
          gsap.fromTo(onda.firstChild, { yPercent: -112 }, { yPercent: 0, ease: 'power1.in', scrollTrigger: { ...passagem, end: 'top 20%' } })
          if (conteudoAnt) gsap.to(conteudoAnt, { y: 60, ease: 'none', scrollTrigger: passagem })
        }

        if (modo === 'folhas') {
          gsap.fromTo(
            ant,
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.9,
              filter: 'brightness(0.55)',
              ease: 'none',
              transformOrigin: () => `50% ${ant.offsetHeight - window.innerHeight / 2}px`,
              scrollTrigger: passagem,
            }
          )
        }

        // quando a próxima cobre a tela inteira, a de baixo para de desenhar
        ScrollTrigger.create({
          trigger: s,
          start: 'top top',
          onEnter: () => ant.classList.add('coberta'),
          onLeaveBack: () => ant.classList.remove('coberta'),
        })
      })
    })
    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
      criados.forEach((e) => e.remove())
      ro.disconnect()
      clearTimeout(espera)
      ScrollTrigger.removeEventListener('refreshInit', solta)
      ScrollTrigger.removeEventListener('refresh', volta)
      lista.forEach((s) => {
        s.style.top = ''
        s.style.position = ''
        s.classList.remove('coberta')
      })
      delete html.dataset.transicao
    }
  }, [modo])
}
