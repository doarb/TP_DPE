const users = require("../../models/users");
const config = require("../../config/index").config;
const userService = require("../../services/users");
const debug = require('debug')(config.name + ':api:users');

const getUser = async (req, res, next) => {
    let id = req.user._id;
    users.findOne({ "_id": id }).then(data => {
        if (data == null) { return res.status(404).json({ message: 'no user with that id' }); }
        return res.status(200).json(data.element);
    }).catch(err => {
        if (err) return next(err);
    });
}

const createUser = async (req, res, next) => {
    let user = req.body;
    debug(user);
    try {
        let Myuser = await userService.createUser(user);
        return res.status(201).json(Myuser.element);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getUser,
    createUser
}