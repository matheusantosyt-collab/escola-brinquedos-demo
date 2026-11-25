import { describe, it, expect } from 'vitest'
import { ordenaRecados, SEMENTE } from './mural'

const titulos = (l) => l.map((r) => r.titulo)

describe('ordenaRecados', () => {
  it('mostra próximos eventos primeiro (do mais perto) e depois o que já passou', () => {
    expect(titulos(ordenaRecados(SEMENTE, 'todos', '2026-11-24'))).toEqual([
      'Dia do faz de conta',
      'Festa de encerramento',
      'Matrículas 2027 abertas',
    ])
  })
  it('filtra por tipo', () => {
    expect(ordenaRecados(SEMENTE, 'evento', '2026-11-24')).toHaveLength(2)
    expect(titulos(ordenaRecados(SEMENTE, 'noticia', '2026-11-24'))).toEqual(['Matrículas 2027 abertas'])
  })
  it('recado de hoje conta como próximo', () => {
    const l = [...SEMENTE, { id: 'x', tipo: 'noticia', titulo: 'Hoje', data: '2026-11-24', texto: '.' }]
    expect(titulos(ordenaRecados(l, 'todos', '2026-11-24'))[0]).toBe('Hoje')
  })
  it('passados vêm do mais recente ao mais antigo', () => {
    const l = [
      { id: 'a', tipo: 'noticia', titulo: 'Antigo', data: '2026-10-01', texto: '.' },
      { id: 'b', tipo: 'noticia', titulo: 'Recente', data: '2026-11-20', texto: '.' },
    ]
    expect(titulos(ordenaRecados(l, 'todos', '2026-11-24'))).toEqual(['Recente', 'Antigo'])
  })
  it('não altera a lista original', () => {
    const copia = SEMENTE.map((r) => r.id)
    ordenaRecados(SEMENTE, 'todos', '2026-11-24')
    expect(SEMENTE.map((r) => r.id)).toEqual(copia)
  })
})
