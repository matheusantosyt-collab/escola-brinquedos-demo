import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilo.css'
import './react.css'
import App from './App.jsx'
import { animarSempre } from './lib/animarSempre'

animarSempre() // antes de montar os componentes, que leem a preferência ao iniciar

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
