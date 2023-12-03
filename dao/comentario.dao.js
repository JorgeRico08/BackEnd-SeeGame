const Comentario = require('../models/comentarios');

class comentarioDAO{
    async crearPublicacion(comentarioData){
        try {
            const comentario = await new Comentario(comentarioData);
            return await comentario.save();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear publicacion');
        }
    }

    
}

module.exports = comentarioDAO;