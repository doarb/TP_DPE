const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');

router.get('/me', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});

router.post('/create',(req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});

debugRoutes('Routes users initialized successfully');
module.exports = router;