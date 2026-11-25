import { describe, it, expect } from 'vitest'
import { animarSempre } from './animarSempre'

// janela falsa com o "reduzir movimento" do sistema LIGADO
const janela = () => ({
  matchMedia: (q) => ({ media: q, matches: /reduce|hover/.test(q), addEventListener() {}, removeEventListener() {} }),
})

describe('animarSempre', () => {
  it('faz os componentes acharem que o movimento não está reduzido', () => {
    const w = janela()
    animarSempre(w)
    expect(w.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(false)
    expect(w.matchMedia('(prefers-reduced-motion:reduce)').matches).toBe(false)
  })
  it('não mexe nas outras consultas', () => {
    const w = janela()
    animarSempre(w)
    expect(w.matchMedia('(hover:hover) and (pointer:fine)').matches).toBe(true)
  })
})
