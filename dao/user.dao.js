
const User = require('../models/users');

class UsuarioDAO {
    
    async obtenerUsuario(username){
        try{
            const user = await User.findOne({username});
            return user;
        }catch (error){
            console.log(error);
            throw new Error('Error al obtener el usuario');
        }
    }

    async crearUsuario(userData) {
        try {
          const user = new User(userData);
          return await user.save();
        } catch (error) {
          throw new Error('Error al crear el usuario');
        }
      }
}

module.exports = UsuarioDAO;