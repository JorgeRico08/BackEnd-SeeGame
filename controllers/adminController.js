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

}

module.exports = AdminController;