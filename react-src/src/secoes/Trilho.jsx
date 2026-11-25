import { useLayoutEffect, useRef, useState } from 'react'

const CASAS = [
  ['inicio', 'Início', '1'],
  ['ensino', 'Ensino', '2'],
  ['familia', 'A família', '3'],
  ['escola', 'A escola', '4'],
  ['mural', 'Mural', '5'],
  ['matricula', 'Matrículas', 'céu'],
]

/** Amarelinha lateral (telas ≥1300px): o peão pula para a casa da seção atual. */
export default function Trilho({ secao }) {
  const trilho = useRef(null)
  const [pos, setPos] = useState(null)

  useLayoutEffect(() => {
    const medir = () => {
      const a = trilho.current?.querySelector(`a[href="#${secao}"]`)
      if (!a) return
      const r = a.getBoundingClientRect()
      const t = trilho.current.getBoundingClientRect()
      setPos(`${r.left - t.left + r.width / 2 - 15}px ${r.top - t.top - 30}px`)
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [secao])

  return (
    <nav className="trilho" ref={trilho} aria-label="Amarelinha: seções da página">
      <span className="peao pulo" aria-hidden="true" style={{ translate: pos ?? undefined }}>
        {/* key muda a cada seção para repetir a animação do pulo */}
        <svg key={secao} viewBox="0 0 44 64">
          <use href="#menina" />
        </svg>
      </span>
      {CASAS.map(([id, titulo, n]) => (
        <a key={id} href={'#' + id} title={titulo} className={(id === secao ? 'on' : '') + (n === 'céu' ? ' fim' : '')}>
          {n}
        </a>
      ))}
    </nav>
  )
}
