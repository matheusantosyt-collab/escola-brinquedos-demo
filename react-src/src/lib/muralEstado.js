export const MURAL_INICIAL = { filtro: 'todos', novo: null }

/** Filtro do mural e recado recém-publicado (como na versão HTML). */
export function estadoMural(estado, acao) {
  if (acao.tipo === 'filtrar') return { filtro: acao.filtro, novo: null }
  if (acao.tipo === 'publicado') return { filtro: 'todos', novo: acao.id }
  return estado
}
