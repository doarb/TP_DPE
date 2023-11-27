const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');




debugRoutes('Routes initialized successfully');
module.exports = function getRoutes() {
    return router;
}