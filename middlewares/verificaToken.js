const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta');
    return decoded.userId;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('El token ha expirado');
      // Puedes manejar la expiración del token aquí, como eliminarlo de las cookies
      return null;
    } else {
      console.error('Error al verificar el token:', error);
      return null;
    }
  }
};

module.exports = verifyToken;
