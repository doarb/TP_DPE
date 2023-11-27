const jwt = require('jsonwebtoken');
const config = require('../config/index').config;
const debugGenerateAccessToken = require('debug')(config.name +':services:auth:generateAccessToken');
const debugGenerateRefreshToken = require('debug')(config.name +':services:auth:generateRefreshToken');

const generateAccessToken = (user) => {
    let userload = {
        name: user.name,
        email: user.email,
        password: user.password
    }
    debugGenerateAccessToken('generating access token : ', user.email);
    return jwt.sign(userload, config.accessToken, { expiresIn: '1800s' });
  }

const generateRefreshToken = (user) => {
    let userload = {
        name: user.name,
        email: user.email,
        password: user.password
    }
    debugGenerateRefreshToken('generating refresh token : ', user.email);
    return jwt.sign(userload, config.refershToken, { expiresIn: '1y' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}