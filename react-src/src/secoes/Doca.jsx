import { useEffect, useRef, useState } from 'react'
import GooeyNav from '../rb/GooeyNav/GooeyNav'
import { Btn, IMG } from '../comum'

export const LINKS = [
  { label: 'Ensino', href: '#ensino' },
  { label: 'A família', href: '#familia' },
  { label: 'A escola', href: '#escola' },
  { label: 'Mural', href: '#mural' },
]

export default function Doca({ secao, onEntrar }) {
  const [aberto, setAberto] = useState(false)
  const botao = useRef(null)

  useEffect(() => {
    if (!aberto) return
    const fora = (e) => !e.target.closest('.doca') && setAberto(false)
    const esc = (e) => {
      if (e.key === 'Escape') {
        setAberto(false)
        botao.current?.focus()
      }
    }
    document.addEventListener('click', fora)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('click', fora)
      document.removeEventListener('keydown', esc)
    }
  }, [aberto])

  const i = LINKS.findIndex((l) => l.href === '#' + secao)

  return (
    <header className={'doca vidro' + (aberto ? ' aberto' : '')}>
      <a className="marca" href="#inicio" aria-label="Escola Brinquedos e Brincadeiras, início">
        <img src={IMG + 'logo.webp'} alt="" width="44" height="44" />
        <b>
          Brinquedos
          <br />
          <span>&amp; Brincadeiras</span>
        </b>
        <span className="demo">DEMO</span>
      </a>
      <div className={'gooey-wrap' + (i < 0 ? ' sem-ativo' : '')}>
        <GooeyNav
          items={LINKS}
          activeIndex={Math.max(0, i)}
          theme="light"
          frame={false}
          size="sm"
          color="#ffc928"
          activeTextColor="#141a4d"
        />
      </div>
      <nav id="menu" className="menu-cel" aria-label="Seções">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setAberto(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <button
        ref={botao}
        className="liso sm menu-bt"
        type="button"
        aria-expanded={aberto}
        aria-controls="menu"
        style={{ color: 'var(--azul)' }}
        onClick={() => setAberto((a) => !a)}
      >
        Menu
      </button>
      <button className="liso sm" type="button" style={{ color: 'var(--azul)' }} onClick={() => onEntrar()}>
        Entrar
      </button>
      <Btn className="btn sm" href="#matricula">
        Matrículas
      </Btn>
    </header>
  )
}
