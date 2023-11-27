const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');
const userControler = require('../controlers/users')
const authWithToken = require('../../middlewares/authwithtoken');

router.get('/me',authWithToken.authenticateToken, userControler.getUser);

router.post('/create',userControler.createUser);

debugRoutes('Routes users initialized successfully');
module.exports = router;