export const ZAP = '5581989574792'

/** Máscara (81) 98957-4792 enquanto digita. */
export function formataTelefone(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  let o = ''
  if (d.length > 0) o = '(' + d.slice(0, 2)
  if (d.length > 2) o += ') ' + d.slice(2, 7)
  if (d.length > 7) o += '-' + d.slice(7)
  return o
}

/** Retorna a mensagem de erro do primeiro campo inválido, ou null. */
export function validaVisita({ nome, tel, etapa, lgpd }) {
  if (nome.trim().length < 2) return 'Informe seu nome.'
  if (tel.replace(/\D/g, '').length < 10) return 'Informe um WhatsApp com DDD.'
  if (!etapa) return 'Escolha a etapa de interesse.'
  if (!lgpd) return 'Marque a autorização de uso dos dados para continuar.'
  return null
}

export function mensagemZap({ nome, etapa, turno, id }) {
  return `Olá! Sou ${nome} e gostaria de agendar uma visita. Interesse: ${etapa}. Melhor horário: ${turno.toLowerCase()}. Protocolo ${id}.`
}

export function linkZap(msg) {
  return `https://wa.me/${ZAP}?text=${encodeURIComponent(msg)}`
}
