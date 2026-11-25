const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const dois = (n) => String(n).padStart(2, '0')

/** Data local no formato AAAA-MM-DD (não UTC). */
export function hoje(d = new Date()) {
  return `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`
}

/** '2026-11-27' → '27 nov 2026' */
export function diaCurto(iso) {
  const [a, m, d] = iso.split('-')
  return `${+d} ${MESES[+m - 1]} ${a}`
}
