
const User = require('../models/users');
const Pub =  require('../models/publicaciones');

class AdminDAO {
    
    async users() {
        try {
            const usuario = User.find({});
            return usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }

    async obtenerInsultos(usuarioID){
        try {
            const results = await Pub.find({ "descripcion": { $regex: /negro|maricon|lesbiana|gay/i}}).populate('user');
            return results;
        }catch(error) {
            console.log(error);
            throw new Error('Error al obtener la consulta de palabras');
        }
    }

}

module.exports = AdminDAO;