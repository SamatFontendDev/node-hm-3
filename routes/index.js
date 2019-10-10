const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/mainPage');
const ctrlAdmin = require('../controllers/admin');
const ctrlLogin = require('../controllers/login');

router.get('/', ctrlMain.get);
router.get('/admin', ctrlAdmin.get);
router.get('/login', ctrlLogin.get);

module.exports = router;