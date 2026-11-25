export const SEMENTE = [
  { id: 's1', tipo: 'noticia', titulo: 'Matrículas 2027 abertas', data: '2026-11-03', texto: 'Faça parte desta grande família! Agende uma visita com a secretaria.' },
  { id: 's2', tipo: 'evento', titulo: 'Dia do faz de conta', data: '2026-11-27', texto: 'As crianças vêm fantasiadas e a escola vira palco de histórias.', ex: true },
  { id: 's3', tipo: 'evento', titulo: 'Festa de encerramento', data: '2026-12-12', texto: 'Apresentações das turmas e confraternização com as famílias.', ex: true },
]

/** Próximos (data >= hoje) do mais perto ao mais longe; depois os passados, do mais recente. */
export function ordenaRecados(recados, filtro, hojeIso) {
  const l = recados.filter((r) => filtro === 'todos' || r.tipo === filtro)
  const vem = l.filter((r) => r.data >= hojeIso).sort((a, b) => (a.data < b.data ? -1 : 1))
  const foi = l.filter((r) => r.data < hojeIso).sort((a, b) => (a.data < b.data ? 1 : -1))
  return vem.concat(foi)
}
