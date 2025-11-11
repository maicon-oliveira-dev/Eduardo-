const { Router } = require('express');
const Posts = require('../models/posts.memory');
const router = Router();

// Home - listagem de artigos publicados
router.get('/', (req, res) => {
  const posts = Posts.getPublished();
  res.render('home', {
    title: 'Blog Jurídico - Especialista em Recuperação Judicial',
    metaDescription: 'Artigos claros sobre Recuperação Judicial e reestruturação de empresas.',
    posts
  });
});

// Página de artigo individual
router.get('/post/:slug', (req, res) => {
  const { slug } = req.params;
  const post = Posts.findBySlug(slug);
  if (!post) {
    return res.status(404).render('404', { title: 'Página não encontrada' });
  }
  return res.render('post', { title: post.title, metaDescription: post.excerpt || post.title, post });
});

// Sobre o advogado
router.get('/sobre', (req, res) => {
  res.render('about', { title: 'Sobre o Advogado', metaDescription: 'Conheça a trajetória do Dr. Eduardo na advocacia empresarial e em Recuperação Judicial.' });
});

// Contato
router.get('/contato', (req, res) => {
  res.render('contact', { title: 'Contato', metaDescription: 'Canal direto com o escritório do Dr. Eduardo para empresas em busca de orientação jurídica especializada.' });
});

module.exports = router;
