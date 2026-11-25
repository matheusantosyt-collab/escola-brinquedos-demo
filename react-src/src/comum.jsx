import { useEffect, useState } from 'react'
import AnimatedContent from './rb/AnimatedContent/AnimatedContent'

export const IMG = import.meta.env.BASE_URL + 'img/'

/** Botão "bola" com respingos no hover. Vira <a> quando recebe href. */
export function Btn({ className = 'btn', children, ...props }) {
  const Tag = props.href ? 'a' : 'button'
  return (
    <Tag className={className} {...props}>
      <span className="gota" aria-hidden="true">
        <i style={{ '--l': '22%', '--dl': '0s' }} />
        <i style={{ '--l': '52%', '--dl': '-.25s', '--y': '34px' }} />
        <i style={{ '--l': '80%', '--dl': '-.5s' }} />
      </span>
      {children}
    </Tag>
  )
}

/** Desenho reutilizável dos <symbol> (menina, menino, catavento…). */
export const Uso = ({ id, box = '0 0 40 40', ...p }) => (
  <svg viewBox={box} {...p}>
    <use href={'#' + id} />
  </svg>
)

/** Entrada das seções: AnimatedContent (React Bits) com o "pulo" da página original. */
export const Surge = (props) => (
  <AnimatedContent distance={46} duration={0.9} ease="back.out(1.6)" rotate={-2} threshold={0.12} {...props} />
)

const GOTAS = [
  ['4%', 56, 5.9, -2.4], ['13%', 34, 3.4, -3.2], ['22%', 56, 4.8, -5.5], ['34%', 44, 3.3, -2.6], ['45%', 34, 3.9, -3.3],
  ['57%', 34, 5.5, -0.7], ['66%', 44, 5.0, -3.5], ['78%', 34, 4.8, -2.4], ['89%', 44, 3.3, -5.2],
]
/** Tinta pingando no topo da seção. */
export const Tinta = ({ cor }) => (
  <div className="tinta" style={{ '--k': cor }} aria-hidden="true">
    {GOTAS.map(([l, w, t, dl]) => (
      <i key={l} style={{ '--l': l, '--w': w + 'px', '--t': t + 's', '--dl': dl + 's' }} />
    ))}
  </div>
)

/** Estado salvo no navegador (mesmas chaves da versão HTML). */
export function useGuardado(chave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const v = localStorage.getItem(chave)
      return v ? JSON.parse(v) : inicial
    } catch {
      return inicial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      /* navegador sem localStorage: segue só na memória */
    }
  }, [chave, valor])
  return [valor, setValor]
}

/** Largura da janela, para os componentes que pedem tamanho em px. */
export function useLargura() {
  const [w, setW] = useState(() => window.innerWidth)
  useEffect(() => {
    const f = () => setW(window.innerWidth)
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return w
}
