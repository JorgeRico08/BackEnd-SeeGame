const UsuarioDAO = require('../dao/user.dao');
const PublicacionesDAO = require('../dao/publicacion.dao');
const ComentariosDAO = require("../dao/comentario.dao");
const OpinionDAO = require("../dao/opinion.dao");
const Publi = require("../models/publicaciones")
const Comentario = require("../models/comentarios");
const Opinion = require("../models/opinion");
const User = require('../models/users');
const mongoose = require('mongoose');


class UserController {
    constructor() {
        this.user = new UsuarioDAO();
        this.publicaciones = new PublicacionesDAO();
        this.comentarios = new ComentariosDAO();
        this.opiniones = new OpinionDAO()
    }

    async crearPublicacion(req, res){
        try {
            const objPublicaion = new Publi({
                userid: req.body.userid,
                nickname: req.body.nickname,
                nombrePublicacion: req.body.nombrePublicacion,
                descripcion: req.body.descripcion,
                urlImagen: req.body.urlsImagenes
            })

            const newPublicacion = await this.publicaciones.crearPublicacion(objPublicaion);
            
            res.status(201).json({messge: newPublicacion._id});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al registrar la publicación' });
        }
    }
    
    async verPublicaciones(req, res) {
        try {
            const misPublicacion = await Publi.find({});
            res.status(201).json({publicacion: misPublicacion});
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el publicacion' });
        }
    }

    async verDetallePublicacion(req, res) {
        const idPub = req.params.idPublicacion;
        try {
            const publicacion = await Publi.find({_id: idPub});
            res.status(201).json({publicacion: publicacion});
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los detalles de la publicación' });
        }
    }

    async publicacionSearch(req, res) {
        const nombrePublicacion = req.params.nombrePublicacion;
        try {
            const publicacion = await Publi.find({ nombrePublicacion: { $regex: new RegExp(nombrePublicacion, 'i') } });
    
            if (!publicacion || publicacion.length === 0) {
                return res.status(404).json({ error: 'Publicación no encontrada.' });
            }
    
            res.status(200).json({ publicacion: publicacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al buscar la publicación.' });
        }
    }

    async verPublicacionesPerfil(req, res) {
        try {
            const misPublicacion = await Publi.find({nickname: req.body.nickname});
            res.status(201).json({publicacion: misPublicacion});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al visualizar perfil.' });
        }
    }

    async crearComentario(req, res) {
        try {
            const objComentario = new Comentario({
                idPublicacion: req.body.idPublicacion,
                user:req.body.nickname,
                comentario:req.body.comentario,
            })

            const newPublicacion = await this.comentarios.crearPublicacion(objComentario);
            
            res.status(201).json({messge: "OK"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al registrar la publicación' });
        }
    }

    async obtenerComentarios(req, res) {
        try {
            const misPublicacion = await Comentario.find({idPublicacion: req.body.idPublicacion});
            res.status(201).json({comentarios: misPublicacion});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al visualizar los comentarios.' });
        }
    }

    async actualizarImagenPub(req, res) {
        try {
            const { idPublicacion, urlsImagenes } = req.body;
    
            // Verifica si el idPublicacion es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(idPublicacion)) {
                return res.status(400).json({ error: 'ID de publicación no válido.' });
            }
    
            // Actualiza la imagen de la publicación por el ID
            const publicacionActualizada = await Publi.findByIdAndUpdate(
                idPublicacion,
                { $set: { urlImagen: JSON.parse(urlsImagenes) } },
                { new: true } // Devuelve el documento actualizado
            );
    
            if (!publicacionActualizada) {
                return res.status(404).json({ error: 'Publicación no encontrada.' });
            }
    
            res.status(201).json({ messge: "OK" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la imagen de la publicación.' });
        }
    }

    async eliminarPublicacion(req, res) {
        try {
            const { idPublicacion } = req.body;
    
            // Verifica si el idPublicacion es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(idPublicacion)) {
                return res.status(400).json({ error: 'ID de publicación no válido.' });
            }
    
            // Busca y elimina la publicación por el ID
            const publicacionEliminada = await Publi.findByIdAndDelete(idPublicacion);
    
            if (!publicacionEliminada) {
                return res.status(404).json({ error: 'Publicación no encontrada.' });
            }
    
            res.status(200).json({ message: 'Publicación eliminada exitosamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la publicación.' });
        }
    }

    async crearOpinion(req, res) {
        try {
            const objOpinion = new Opinion({
                user:req.body.nickname,
                opinion:req.body.opinion,
            })

            const newPublicacion = await this.opiniones.crearOpinion(objOpinion);
            
            res.status(201).json({messge: "OK"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al registrar la publicación' });
        }
    }

}

module.exports = UserController;