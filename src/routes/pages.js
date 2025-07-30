import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', (req, res) => {
  res.render('index');
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/delete', (req, res) => {
  res.render('removeItem');
});

export default router;


