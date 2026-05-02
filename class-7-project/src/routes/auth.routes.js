// Which routes are there
const {registerController,loginController} = require('../controllers/auth.controller')
const express = require("express");
const jwt = require('jsonwebtoken')


const router = express.Router();

/*
POST /register
POST /login
GET /user [protected]
*/

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
