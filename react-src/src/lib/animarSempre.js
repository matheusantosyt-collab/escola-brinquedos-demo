const REDUZIR = /prefers-reduced-motion\s*:\s*reduce/

/**
 * "Animar sempre" (mesma decisão da versão HTML): os componentes do React Bits pulam direto para o
 * fim quando o sistema pede "reduzir movimento". Aqui eles passam a ver essa preferência desligada.
 */
export function animarSempre(w = window) {
  const original = w.matchMedia.bind(w)
  w.matchMedia = (q) => (REDUZIR.test(q) ? original('not all') : original(q))
}
