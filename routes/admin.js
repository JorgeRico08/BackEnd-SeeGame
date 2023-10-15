var express = require('express');
var router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const authenticateToken = require("../middlewares/authenticateToken");

var AdminController = require('../controllers/adminController');
const admin = new AdminController();

router.get('/admin/adminDashboard', authenticateToken, isAdmin, admin.getDashboard.bind(admin));

module.exports = router;
