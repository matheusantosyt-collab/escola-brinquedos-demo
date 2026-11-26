// Conteúdo compartilhado entre as páginas. O que não veio da escola está marcado como exemplo nas páginas.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/')
export const url = (p = '') => BASE + p.replace(/^\//, '')

export const ESCOLA = {
  nome: 'Escola Brinquedos e Brincadeiras',
  endereco: 'Rua Conselheiro Nabuco, 336',
  bairro: 'Casa Amarela · Recife · PE',
  cep: '52070-010',
  telefone: '(81) 3265-2783',
  telLink: 'tel:+558132652783',
  whatsapp: '(81) 98957-4792',
  zap: 'https://wa.me/5581989574792',
  instagram: 'https://www.instagram.com/escolabb',
  tiktok: 'https://www.tiktok.com/@escolabb',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Conselheiro+Nabuco+336+Casa+Amarela+Recife',
}

export const MENU = [
  ['', 'Início'],
  ['a-escola/', 'A escola'],
  ['ensino/', 'Ensino'],
  ['matriculas/', 'Matrículas'],
  ['contato/', 'Contato'],
]

export const NUMEROS = [
  ['26', 'anos de história'],
  ['181', 'alunos matriculados'],
  ['11', 'professores'],
]

export const ESTRUTURA = [
  ['Parque infantil', 'Brinquedos ao ar livre para correr, subir e escorregar.', 'var(--verm)'],
  ['Biblioteca', 'Com sala de leitura e acervo para cada faixa etária.', 'var(--azul)'],
  ['Dois pátios', 'Um coberto e um descoberto, para brincar com chuva ou sol.', '#a06c00'],
  ['Refeitório', 'Cozinha na escola e refeições acompanhadas.', '#23824a'],
  ['Acessibilidade', 'Rampas e banheiro adaptado.', 'var(--azul)'],
  ['Sala de recursos', 'Atendimento educacional especializado.', 'var(--verm)'],
]
