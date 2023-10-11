
const User = require('../models/users');

class AdminDAO {
    
    async users() {
        try {
            const usuario = User.find({});
            return usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }

}

module.exports = AdminDAO;