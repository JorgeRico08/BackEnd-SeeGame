var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const auth = new authController();
const authenticateToken = require("../middlewares/authenticateToken");


/* GET users listing. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login', auth.loginAuth.bind(auth));

router.post('/registro', auth.registroAuth.bind(auth));

router.get('/ruta-protegida', authenticateToken,function(req, res, next) {
  res.json('Ruta protected');
});


module.exports = router;
