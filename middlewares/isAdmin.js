// authMiddleware.js
const verifyToken = require("./verificaToken");
const User = require("../models/users")

const isAdmin = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }
    const userId = verifyToken(token);

    const user = await User.findById(userId);
    if (user.rol !== 'admin') {
        return res.json("error: no tines acceso a estas funciones");
    }
    req.userId = user;
    next();
};

module.exports = isAdmin;
