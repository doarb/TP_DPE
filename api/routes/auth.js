const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');
var authControler = require('../controlers/auth')

router.get('/login', authControler.login);

router.get('/refreshToken',(req, res) => {
    res.status(200).json({
        message: "Hello World! refreshToken"
    });
});

debugRoutes('Routes auth initialized successfully');
module.exports = router;