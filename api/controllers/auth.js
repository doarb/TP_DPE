const jwt = require('jsonwebtoken');
const config = require('../../config/index').config;
const Services = require('../../services/auth');
const UserServices = require('../../services/users');
const debugLogin = require('debug')(config.name +':controlers:users:login');
const debugRefreshToken  = require('debug')(config.name +':controlers:users:refreshToken');


const login = async (req, res, next) => {
    debugLogin('start login');
    let user = await UserServices.getUser(req.body.email);
    if(user == undefined){
        debugLogin('user not found');
        return res.status(401).json({
            message: "invalid credentials"
        });
    }

    if(!UserServices.authenticate(user.email,req.body.password)){
        debugLogin('invalid password');
        return res.status(401).json({
            message: "invalid credentials"
        });
    }
    const accessToken = Services.generateAccessToken(user.element);
    debugLogin('access token generated');
    const refreshToken = Services.generateRefreshToken(user.element);
    debugLogin('refresh token generated');
    debugLogin('end login');
    return res.status(200).json({
        accessToken,
        refreshToken
    });
}

const refreshToken = async (req, res, next) => {
    debugRefreshToken('start refreshToken');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    debugRefreshToken('token not null')
    jwt.verify(token, config.refershToken, async (err, MyUser) => {
      if (err) {
        debugRefreshToken('error: ' + err)
        return res.sendStatus(401)
      }
  
      var user = await UserServices.getUser(MyUser.email);
      if (user == undefined) {
        return res.status(401).send('invalid credentials');
      }
      

      const refreshedToken = Services.generateAccessToken(user.element);
      debugRefreshToken('end refreshToken');
      res.send({
        accessToken: refreshedToken,
      });
    });
}

module.exports ={
    login,
    refreshToken
}