const express = require('express');
const router = express.Router();
const config = require('../../config/index').config;
const debugRoutes = require('debug')(config.name +':routes');

const dpe = require('./dpe');
const usersRouter = require('./users');
const authRouter = require('./auth');
const searchRoutes = require('./searches');

router.use('/dpe', dpe);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/searches', searchRoutes);

router.use("/", (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});



debugRoutes('Routes initialized successfully');
module.exports = router;