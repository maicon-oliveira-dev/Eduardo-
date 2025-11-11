const { Router } = require('express');
const router = Router();

// login (fake por enquanto, apenas para testar fluxo)
router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Login do Advogado', error: null });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // TODO: substituir por validação real
  if (email === 'admin@advblog.com' && password === '123456') {
    req.session.user = { name: 'Dr. Especialista', email };
    return res.redirect('/admin');
  }

  return res.render('admin/login', {
    title: 'Login do Advogado',
    error: 'Credenciais inválidas.'
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;