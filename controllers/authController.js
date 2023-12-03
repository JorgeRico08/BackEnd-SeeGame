const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/users")
const UsuarioDAO = require('../dao/user.dao');

const generateToken = (userId, username) => {
    const token = jwt.sign({ userId, username }, 'tu_clave_secreta', { expiresIn: '2h' }); //  --- Este es para que sure 2 horas el token 
    // const token = jwt.sign({ userId }, 'tu_clave_secreta', { expiresIn: 60 }); // Como prueba esta este de 60 segundos 
    return token;
};

class authController {
    constructor(){
        this.userDao = new UsuarioDAO();
    };

    async registroAuth(req, res) {
        try {
            const { username, email, password, nombre, apellido} = req.body;
            const existingUser = await this.userDao.obtenerUsuario(username);
            if (existingUser) {
              return res.status(400).json({ error: 'El usuario ya existe' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const userObj = new User({
                username,
                email,
                password: hashedPassword,
                nombre,
                apellido,
                image : "https://storage.googleapis.com/kiwisazonp.appspot.com/users/412checo.jpg?GoogleAccessId=firebase-adminsdk-b8gdk%40kiwisazonp.iam.gserviceaccount.com&Expires=16730344800&Signature=uqE1t4YUt0pgktdSpCuL4C%2B1J63YuaZ8TUhH2scfeRLMAmgUMUck9KyQ%2Bzk7FyVcnF91Z5f%2FRYBHd%2BYo5U7BRluUViU2JmGg%2BpcASdSxhT0uzpSsOgUqHJGXNqtWP0N4e%2B0%2FjPd7w0Iya3BjzFx3H2wybLdc%2Bb2irSwbjEHD7V9IddMyU8QZwYltAyb5ZR8RCm9sNAg8mvqmgBMAetXKC2tsRcowCtx99xIFX%2Bs00uz5xbq80b5HztFw99jvVruPqXn8qaZR1B7Z40T5hOeeYaW19d%2FLjOEIAITTRe3UcoMAkacI9VH72sP%2B0dm%2Fqfbcf2iV0Zi%2BKK1eHLO%2B%2FhlaIg%3D%3D",
            });
            const crear = await this.userDao.crearUsuario(userObj);
            res.status(201).json({ message: 'Usuario registrado con éxito', crear });
          
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el usuario' });
            console.log(error);
        }
    }

    async loginAuth(req, res){
        try {
            const { username, password } = req.body;
            
            const user = await this.userDao.obtenerUsuario(username);
            
            if (!user) {
                return res.status(401).json({ error: 'Usuario no existe' });
              }
            
            const passwordMatch = await bcrypt.compare(password, user.password);
        
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        
            if (user.isActive == false) {
                return res.status(401).json({ error: 'Usuario desactivado' });
            }
            const token = generateToken(user._id,  username);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
}

module.exports = authController;