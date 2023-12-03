var express = require('express');
var router = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController();
const authenticateToken = require("../middlewares/authenticateToken");
const isUser = require("../middlewares/isUser");
/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/crearPublicacion', authenticateToken, isUser , userController.crearPublicacion.bind(userController));
router.get('/users/verPublicaciones', authenticateToken, isUser,userController.verPublicaciones.bind(userController));
router.get('/users/verDetallePublicacion/:idPublicacion', authenticateToken, isUser,userController.verDetallePublicacion.bind(userController));
router.get('/users/BuscarPublicacion/:nombrePublicacion', authenticateToken, isUser,userController.publicacionSearch.bind(userController));
router.post('/users/eliminarPub', authenticateToken, isUser,userController.eliminarPublicacion.bind(userController));
router.post('/users/verPerfil', authenticateToken, isUser,userController.verPublicacionesPerfil.bind(userController));
router.post('/users/crearComentario', authenticateToken, isUser,userController.crearComentario.bind(userController));
router.post('/users/obtenerComentarios', authenticateToken, isUser,userController.obtenerComentarios.bind(userController));
router.post('/users/actualizarImagenPub', authenticateToken, isUser,userController.actualizarImagenPub.bind(userController));
router.post('/users/darOpinion', authenticateToken, isUser,userController.crearOpinion.bind(userController));

module.exports = router;
