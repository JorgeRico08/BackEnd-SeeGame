var express = require('express');
var router = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController();
const authenticateToken = require("../middlewares/authenticateToken");

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/crearPublicacion', authenticateToken, userController.crearPublicacion.bind(userController));
router.get('/users/verPublicacion', authenticateToken, userController.verPublicacion.bind(userController));


module.exports = router;
