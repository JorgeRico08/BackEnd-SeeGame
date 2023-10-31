var express = require('express');
var router = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController();
const authenticateToken = require("../middlewares/authenticateToken");
const isUser = require("../middlewares/isUser");

router.post('/users/crearPublicacion', authenticateToken, isUser , userController.crearPublicacion.bind(userController));
router.get('/users/verPublicacion', authenticateToken, isUser,userController.verPublicacion.bind(userController));

router.post('/users/:id/comentar', authenticateToken, isUser, userController.agregarComentario.bind(userController));
router.get('/users/:id/comentarios', authenticateToken, isUser, userController.verComentarios.bind(userController));

module.exports = router;
