const Publicacion = require('../models/publicaciones');

class publicaionDAO{
    async crearPublicacion(publicacionData){
        try {
            const publicacion = await new Publicacion(publicacionData);
            return await publicacion.save();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear publicacion');
        }
    }

    
}

module.exports = publicaionDAO;