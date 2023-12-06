const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT,
  name: process.env.APP_NAME,
  debug: process.env.DEBUG,
  secretExpress: process.env.EXPRESSSECRET,
  host: process.env.HOST,
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refershToken: process.env.REFRESH_TOKEN_SECRET,
  urlAPI: process.env.URL_API,
};

const mongo = {
  DB_URI: process.env.DATABASEURI,
};

module.exports = {
  config,
  mongo,
};
