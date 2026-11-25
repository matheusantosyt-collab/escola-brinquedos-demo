import { describe, it, expect } from 'vitest'
import { formataTelefone, validaVisita, mensagemZap, linkZap } from './visita'

describe('formataTelefone', () => {
  it('celular com DDD', () => expect(formataTelefone('81989574792')).toBe('(81) 98957-4792'))
  it('ignora o que não é dígito e corta em 11', () => expect(formataTelefone('(81) 98957-47921234')).toBe('(81) 98957-4792'))
  it('parcial enquanto digita', () => {
    expect(formataTelefone('8')).toBe('(8')
    expect(formataTelefone('8198')).toBe('(81) 98')
  })
  it('vazio continua vazio', () => expect(formataTelefone('')).toBe(''))
})

const ok = { nome: 'Ana Souza', tel: '(81) 98957-4792', etapa: 'Educação Infantil', lgpd: true }

describe('validaVisita', () => {
  it('aceita dados completos', () => expect(validaVisita(ok)).toBeNull())
  it('nome curto', () => expect(validaVisita({ ...ok, nome: ' A ' })).toBe('Informe seu nome.'))
  it('telefone sem DDD', () => expect(validaVisita({ ...ok, tel: '(81) 9895' })).toBe('Informe um WhatsApp com DDD.'))
  it('sem etapa', () => expect(validaVisita({ ...ok, etapa: '' })).toBe('Escolha a etapa de interesse.'))
  it('sem consentimento', () =>
    expect(validaVisita({ ...ok, lgpd: false })).toBe('Marque a autorização de uso dos dados para continuar.'))
})

describe('mensagem do WhatsApp', () => {
  it('monta o texto como no HTML', () => {
    expect(mensagemZap({ nome: 'Ana Souza', etapa: 'Educação Infantil', turno: 'Manhã', id: 'EBB-123456' })).toBe(
      'Olá! Sou Ana Souza e gostaria de agendar uma visita. Interesse: Educação Infantil. Melhor horário: manhã. Protocolo EBB-123456.'
    )
  })
  it('link para o número da escola com texto codificado', () => {
    expect(linkZap('Olá!')).toBe('https://wa.me/5581989574792?text=Ol%C3%A1!')
  })
})
