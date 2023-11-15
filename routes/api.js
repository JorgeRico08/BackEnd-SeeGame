var express = require('express');
var routerApi = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const isUser = require("../middlewares/isUser");
const apiController = require("../controllers/apiController");
/* GET users listing. */

routerApi.get('/videogames',authenticateToken, isUser, apiController.getVideojuego);

routerApi.get('/videogame/:idGame', authenticateToken, isUser, apiController.getDetalleVideojuego);

routerApi.get('/videogame/name/:name', authenticateToken, isUser, apiController.getVideojuegoNombre);

routerApi.get('/evento/:idEvento', authenticateToken, isUser, apiController.getDetalleEvento);

routerApi.get('/eventos', authenticateToken, isUser, apiController.getEventos);

routerApi.get('/eventos/:name', authenticateToken, isUser, apiController.getEventoNombre);




module.exports = routerApi;
