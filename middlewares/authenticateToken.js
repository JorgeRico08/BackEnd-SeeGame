const verifyToken = require("./verificaToken");
const User = require("../models/users");

const authenticateToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;


  try {

    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const token = authorizationHeader.split(" ")[1];

    const userId = verifyToken(token);

    if (!userId) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.userId = user;
    next();
  } catch (error) {
    console.error('Error en la autenticación del token:', error);
    res.status(500).json({ error: 'Error en la autenticación del token' });
  }
};

module.exports = authenticateToken;
