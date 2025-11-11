require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet');

const publicRoutes = require('./src/routes/public.routes');
const adminRoutes = require('./src/routes/admin.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // layout padrão para o site público

// Sessão com opções seguras
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-adv-blog',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // em produção, alterar para true com HTTPS
    sameSite: 'lax'
  }
}));

// Segurança básica
app.use(helmet({ contentSecurityPolicy: false }));

// Estáticos
app.use(express.static(path.join(__dirname, 'src/public')));

// Rotas
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

