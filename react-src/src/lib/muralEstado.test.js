import { describe, it, expect } from 'vitest'
import { estadoMural, MURAL_INICIAL } from './muralEstado'

describe('estadoMural', () => {
  it('começa mostrando tudo, sem recado novo', () => {
    expect(MURAL_INICIAL).toEqual({ filtro: 'todos', novo: null })
  })
  it('publicar com filtro "Eventos" ativo volta para "Tudo" e destaca o novo recado', () => {
    const filtrado = estadoMural(MURAL_INICIAL, { tipo: 'filtrar', filtro: 'evento' })
    expect(estadoMural(filtrado, { tipo: 'publicado', id: 'r1' })).toEqual({ filtro: 'todos', novo: 'r1' })
  })
  it('trocar de filtro tira o destaque do recado novo', () => {
    const publicado = estadoMural(MURAL_INICIAL, { tipo: 'publicado', id: 'r1' })
    expect(estadoMural(publicado, { tipo: 'filtrar', filtro: 'noticia' })).toEqual({ filtro: 'noticia', novo: null })
  })
})
