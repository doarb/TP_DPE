const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');

router.get('/login', (req, res) => {
    res.status(200).json({
        message: "Hello World! login"
    });
});

router.get('/refreshToken',(req, res) => {
    res.status(200).json({
        message: "Hello World! refreshToken"
    });
});

debugRoutes('Routes auth initialized successfully');
module.exports = router;