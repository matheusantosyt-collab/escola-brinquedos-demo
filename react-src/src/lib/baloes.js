const CORES = ['#e02229', '#1c2dae', '#ffc928', '#8ed0ff', '#ffffff']

/** Solta n balões pela tela (comemoração do formulário). Cada um se remove sozinho. */
export function soltaBaloes(n = 26) {
  for (let i = 0; i < n; i++) {
    const b = document.createElement('i')
    b.className = 'balao'
    b.style.left = Math.random() * 96 + 'vw'
    b.style.setProperty('--c', CORES[i % CORES.length])
    b.style.setProperty('--t', 3.2 + Math.random() * 2.6 + 's')
    b.style.setProperty('--dx', Math.random() * 160 - 80 + 'px')
    b.style.setProperty('--rot', Math.random() * 40 - 20 + 'deg')
    b.style.animationDelay = Math.random() * 0.9 + 's'
    document.body.appendChild(b)
    setTimeout(() => b.remove(), 7200)
  }
}
