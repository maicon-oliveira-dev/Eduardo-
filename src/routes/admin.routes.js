const { Router } = require('express');
const { ensureAuth } = require('../middleware/auth');
const Posts = require('../models/posts.memory');
const router = Router();

// Dashboard principal
router.get('/', ensureAuth, (req, res) => {
  res.render('admin/dashboard', {
    title: 'Painel do Advogado',
    user: req.session.user,
    layout: 'layouts/admin'
  });
});

// Listagem de artigos (em memória)
router.get('/posts', ensureAuth, (req, res) => {
  const posts = Posts.getAll();
  res.render('admin/posts', {
    title: 'Meus Artigos',
    posts,
    layout: 'layouts/admin'
  });
});

// Página de novo artigo (form estático, sem salvar ainda)
router.get('/posts/novo', ensureAuth, (req, res) => {
  res.render('admin/new-post', {
    title: 'Novo Artigo',
    layout: 'layouts/admin'
  });
});

// Criação de novo artigo (em memória)
router.post('/posts/novo', ensureAuth, (req, res) => {
  const { title, category, excerpt, content } = req.body;

  if (!title || !content) {
    return res.status(400).render('admin/new-post', {
      title: 'Novo Artigo',
      layout: 'layouts/admin',
      error: 'Título e conteúdo são obrigatórios.'
    });
  }

  Posts.create({ title, category, excerpt, content });
  return res.redirect('/admin/posts');
});

// Alterar status (publicar / rascunho)
router.post('/posts/:id/status', ensureAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "Publicado" ou "Rascunho"

  if (!['Publicado', 'Rascunho'].includes(status)) {
    return res.redirect('/admin/posts');
  }

  Posts.updateStatus(id, status);
  return res.redirect('/admin/posts');
});

// Remover post
router.post('/posts/:id/delete', ensureAuth, (req, res) => {
  const { id } = req.params;
  Posts.remove(id);
  return res.redirect('/admin/posts');
});

module.exports = router;
