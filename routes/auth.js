var express = require('express');
var router = express.Router();
const controllerAuth = require('../controllers/authController');

const authenticateToken = require("../middlewares/authenticateToken");


/* GET users listing. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.json('Inicio de sesion');
});

router.post('/login', controllerAuth.login);

router.get('/registro', function(req, res, next) {
  res.json('Inicio de sesion');
});

router.post('/registro', controllerAuth.registro);

router.get('/ruta-protegida', authenticateToken,function(req, res, next) {
  res.json('Ruta protected');
});


module.exports = router;
