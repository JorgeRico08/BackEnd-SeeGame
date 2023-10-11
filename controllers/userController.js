const UsuarioDAO = require('../dao/user.dao');
const PublicacionesDAO = require('../dao/publicacion.dao');
const Publi = require("../models/publicaciones")
const User = require('../models/users');


class UserController {
    constructor() {
        this.user = new UsuarioDAO();
        this.publicaciones = new PublicacionesDAO();
    }

    async crearPublicacion(req, res){
        try {
            const objPublicaion = new Publi({
                user: req.userId,
                nombrePublicacion: req.body.nombrePublicacion,
                descripcion: req.body.descripcion,
                juegoPublicado: req.body.juegoPublicado,
                categoria: req.body.categoria
            })

            const user = await this.user.obtenerUsuarioID(req.userId);
            const newPublicacion = await this.publicaciones.crearPublicacion(objPublicaion);
            
            // console.log(user);
            user.publicaciones.push(newPublicacion);
            user.save();
            
            res.status(201).json({messge: "publicacion creada correctamente", user: user});
        } catch (error) {
            // console.log(error);
            res.status(500).json({ error: 'Error al registrar el publicacion' });
        }
    }
    
    async verPublicacion(req, res) {
        try {
            const misPublicacion = await Publi.find({user: req.userId}).populate('user');
            res.status(201).json({messge: 'Mis publicaciones', publicacion: misPublicacion});
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el publicacion' });
        }
    }

}

module.exports = UserController;