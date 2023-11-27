const users = require("../../models/users");
const config = require("../../config/index").config;
const userService = require("../../services/users");
const debug = require('debug')(config.name + ':api:users');

const getUser = async (req, res, next) => {
    let id = req.user._id;
    try {
        const user = users.findById(id);
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
}

const createUser = async (req, res, next) => {
    let user = req.body;
    debug(user);
    try {
        let Myuser = await userService.createUser(user);
        return res.status(201).json(Myuser);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {
    getUser,
    createUser
}