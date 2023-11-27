const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');
var userControler = require('../controlers/users')

router.get('/me', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});

router.post('/create',userControler.createUser);

debugRoutes('Routes users initialized successfully');
module.exports = router;