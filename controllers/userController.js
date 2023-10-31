const UsuarioDAO = require('../dao/user.dao');
const PublicacionesDAO = require('../dao/publicacion.dao');
const Publi = require("../models/publicaciones")
const User = require('../models/users');
const Comentario = require('../models/comentarios');


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

    async verComentarios(req, res) {
        const id = req.params.id;
        try {
            const publicacion = await Publi.find({_id:id}).populate('comentarios');
            // const publicacion = await Publi.findById(id).populate('comentarios');  
            res.status(201).json({messge: "Comentario creado correctamente", publicacion});
        }catch (error) {
            console.log(error)
            // res.status(500).json({ error: 'Error al ver comentario' });
            res.status(500).json({ error: error });
        }
    }

    async agregarComentario(req, res) {
        const {id} = req.params;
        // console.log(id);
        try {

            const usuario = await this.user.obtenerUsuarioID(req.userId);
            console.log(usuario);

            const Publicacion = await this.publicaciones.buscarPublicacion(id);
            console.log(Publicacion);

            const comentarioObj = ({
                user: usuario.username,
                comentario: req.body.comentario,
                // publicaciones: Publicacion
            });

            const Com = await this.publicaciones.comentarPublicacion(comentarioObj);
            console.log(Com);

            Publicacion.comentarios.push(Com);
            Publicacion.save();

            res.status(201).json({messge: "Comentario creado correctamente", Publicacion});
        }catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al agregar comentario' });
        }
    }

}

module.exports = UserController;