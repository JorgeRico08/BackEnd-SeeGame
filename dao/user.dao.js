
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

    async obtenerEmail(email){
      try{
          const user = await User.findOne({email});
          return user;
      }catch (error){
          console.log(error);
          throw new Error('Error al obtener el usuario');
      }
  }

    async obtenerUsuarioID(id){
      try{
          const user = await User.findOne(id);
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

      async desactivarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });
          userStatusSubject.next({ userId, isActive: false }); // Notifica que el usuario se ha desactivado
      
          return updatedUser;
        } catch (error) {
          throw new Error('No se pudo desactivar el usuario');
        }
      }
      
    async activarUsuario(userId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { isActive: true });
          return updatedUser;
          
        } catch (error) {
            throw new Error('No se pudo activar el usuario');
        }
        
    }

}

module.exports = UsuarioDAO;