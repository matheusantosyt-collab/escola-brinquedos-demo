import { MODOS } from '../transicoes'

/** Seletor só do demo: troca o estilo de transição entre as seções para comparar. */
export default function Seletor({ modo, onModo }) {
  return (
    <div className="seletor vidro" role="group" aria-label="Estilo de transição entre seções (demonstração)">
      <span>Transição</span>
      {MODOS.map(([id, nome]) => (
        <button key={id} type="button" aria-pressed={modo === id} onClick={() => onModo(id)}>
          {nome}
        </button>
      ))}
    </div>
  )
}
