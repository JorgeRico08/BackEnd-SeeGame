const User = require("../models/users")
const AdminDAO = require('../dao/admin.dao');

class AdminController {
    constructor(){
        this.adminDao = new AdminDAO();
    };

    async getDashboard(req, res) {
        try {
            const users = await this.adminDao.users();
            res.json({users: users});  
        } catch(error) {
            res.status(500).json({ error: 'Error usuarios no encontrados' });
        }
    }

    async controlResportes(req, res) {
        try{
            const insulto = await this.adminDao.obtenerInsultos(req.userId);
            res.json({insultos: insulto});
        } catch(error) {
            res.status(500).json({error: 'Error insultos no encontrados'});
            console.log(error);
        }
    }

}

module.exports = AdminController;