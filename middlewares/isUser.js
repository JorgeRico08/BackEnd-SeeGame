// authMiddleware.js
const verifyToken = require("./verificaToken");
const User = require("../models/users")

const isUser = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }
    const userId = verifyToken(token);

    const user = await User.findById(userId);
    if (user.rol !== 'user') {
        return res.json("error: no pudes controlar la aplicación");
    }
    req.userId = user;
    next();
};

module.exports = isUser;
