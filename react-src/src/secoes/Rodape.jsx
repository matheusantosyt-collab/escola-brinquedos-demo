import { Uso } from '../comum'

export default function Rodape({ onLogin, onPrivacidade }) {
  const abre = (fn, ...a) => (e) => {
    e.preventDefault()
    fn(...a)
  }
  return (
    <footer>
      <div className="wrap">
        <div className="rod">
          <div>
            <div className="fila" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <Uso key={i} id={i % 2 ? 'menino' : 'menina'} box="0 0 44 64" style={{ '--c': i % 2 ? '#fff' : '#e02229', '--i': i }} />
              ))}
            </div>
            <h3>Escola Brinquedos &amp; Brincadeiras</h3>
            <p>Educação Infantil e Ensino Fundamental I</p>
            <p style={{ marginTop: 10 }}>
              Rua Conselheiro Nabuco, 336
              <br />
              Casa Amarela · Recife · PE · 52070-010
            </p>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="https://wa.me/5581989574792" target="_blank" rel="noopener">WhatsApp (81) 98957-4792</a></li>
              <li><a href="tel:+558132652783">Telefone (81) 3265-2783</a></li>
              <li><a href="https://www.instagram.com/escolabb" target="_blank" rel="noopener">Instagram @escolabb</a></li>
              <li><a href="https://www.tiktok.com/@escolabb" target="_blank" rel="noopener">TikTok @escolabb</a></li>
            </ul>
          </div>
          <div>
            <h3>Acesso</h3>
            <ul>
              <li><a href="#familia-login" onClick={abre(onLogin, 'familia')}>Área da família</a></li>
              <li><a href="#professor-login" onClick={abre(onLogin, 'professor')}>Área do professor</a></li>
              <li><a href="#secretaria-login" onClick={abre(onLogin, 'secretaria')}>Painel da secretaria</a></li>
              <li><a href="#privacidade" onClick={abre(onPrivacidade)}>Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Escola Brinquedos e Brincadeiras</span>
          <span>Demonstração de proposta (versão React). Recados marcados como exemplo são fictícios.</span>
        </div>
      </div>
    </footer>
  )
}
