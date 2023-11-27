const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});
router.get('/search',(req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});

debugRoutes('Routes dpe initialized successfully');
module.exports = router;