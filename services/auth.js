const jwt = require('jsonwebtoken');
const config = require('../config/index').config;
const debugGenerateAccessToken = require('debug')(config.name +':services:auth:generateAccessToken');
const debugGenerateRefreshToken = require('debug')(config.name +':services:auth:generateRefreshToken');

const generateAccessToken = (user) => {
    debugGenerateAccessToken('generating access token : ', user.email);
    return jwt.sign(user, config.accessToken, { expiresIn: '1800s' });
  }

const generateRefreshToken = (user) => {
    debugGenerateRefreshToken('generating refresh token : ', user.email);
    return jwt.sign(user, config.refershToken, { expiresIn: '1y' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}