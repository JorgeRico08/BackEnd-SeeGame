const Publicacion = require('../models/publicaciones');
const Comentarios = require('../models/comentarios');

class publicaionDAO{
    async buscarPublicacion(id){
        try {
            const publicacion = await Publicacion.findById(id);
            return publicacion;
        } catch (error) {
            throw new Error('Error al buscar la publicacion');
        }
    }

    async crearPublicacion(publicacionData){
        try {
            const publicacion = await new Publicacion(publicacionData);
            return await publicacion.save();
        } catch (error) {
            // console.error(error);
            throw new Error('Error al crear publicacion');
        }
    }

    async comentarPublicacion(publicacionData){
        try {
            const comentario = await new Comentarios(publicacionData);
            return await comentario.save();
        } catch (error) {
            throw new Error('Error al crear publicacion');
        }
    }
    
}

module.exports = publicaionDAO;