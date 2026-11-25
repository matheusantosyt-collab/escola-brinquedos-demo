import { describe, it, expect } from 'vitest'
import { hoje, diaCurto } from './datas'

describe('hoje', () => {
  it('usa a data local, não UTC (22h30 em Recife continua sendo o mesmo dia)', () => {
    expect(hoje(new Date(2026, 10, 24, 22, 30))).toBe('2026-11-24')
  })
  it('completa mês e dia com zero', () => {
    expect(hoje(new Date(2027, 0, 5, 9, 0))).toBe('2027-01-05')
  })
})

describe('diaCurto', () => {
  it('formata como no mural do HTML', () => {
    expect(diaCurto('2026-11-27')).toBe('27 nov 2026')
    expect(diaCurto('2026-12-03')).toBe('3 dez 2026')
  })
})
