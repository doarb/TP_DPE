const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: String,
    createAt: Date,
    lastConnection: Date
});

module.exports = mongoose.model('dbo-users', UserSchema);
