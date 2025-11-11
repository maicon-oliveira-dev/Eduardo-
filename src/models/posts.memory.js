const slugify = require('slugify');

let posts = [
  {
    id: 1,
    title: 'Recuperação judicial: quando considerar?',
    slug: 'recuperacao-judicial-quando-considerar',
    category: 'Recuperação Judicial',
    excerpt: 'Entenda em linguagem simples os primeiros sinais de alerta e quando buscar apoio especializado.',
    content: 'Conteúdo exemplo...',
    status: 'Publicado',
    date: '10/11/2025'
  },
  {
    id: 2,
    title: '5 erros que colocam em risco a recuperação do seu negócio',
    slug: '5-erros-que-colocam-em-risco-a-recuperacao-do-seu-negocio',
    category: 'Empresarial',
    excerpt: 'Veja armadilhas comuns em negociações e gestão de caixa em momentos de crise.',
    content: 'Conteúdo exemplo...',
    status: 'Rascunho',
    date: '08/11/2025'
  }
];

function getAll() {
  return posts;
}

function getPublished() {
  return posts.filter(p => p.status === 'Publicado');
}

function findBySlug(slug) {
  return posts.find(p => p.slug === slug);
}

function findById(id) {
  return posts.find(p => p.id === Number(id));
}

function create({ title, category, excerpt, content }) {
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const slug = slugify(title, { lower: true, strict: true });
  const date = new Date().toLocaleDateString('pt-BR');
  const status = 'Rascunho';
  const post = { id, title, category, excerpt, content, slug, date, status };
  posts.push(post);
  return post;
}

function updateStatus(id, status) {
  const post = findById(id);
  if (!post) return null;
  post.status = status;
  return post;
}

function remove(id) {
  const index = posts.findIndex(p => p.id === Number(id));
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}

module.exports = { getAll, getPublished, findBySlug, findById, create, updateStatus, remove };
