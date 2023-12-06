//Variables to configure
const config = require("./config/index").config;
const port = config.port;
//server options
const express = require("express");
const app = express();

//Debugging options
const debug = require("debug")("http");
const http = require("http");
debug("booting %o", config.debug);
const debugApp = require("debug")(config.name + ":");

//Swagger options
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Security options
const helmet = require("helmet");
const session = require("express-session");
const sessionCookie = require("cookie-session");
const crypto = require("crypto");

app.use(helmet());
debugApp("Use helmet");

app.disable("x-powered-by");
debugApp("Disable x-powered-by");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: config.secretExpress,
    name: "sessionId",
    resave: false,
    saveUninitialized: true,
  })
);

/**
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
const key1 = crypto.randomBytes(64).toString('hex');
const key2 = crypto.randomBytes(64).toString('hex');
debugApp('key1: ' + key1);
debugApp('key2: ' + key2);

app.use(sessionCookie({
  name: 'session',
  keys: [key1, key2],
  secret: config.secretExpress,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: config.host,
    path: '/',
    expires: expiryDate
  }
}));
*/
debugApp("Use session");

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());
debugApp("Use express.json()");

//Routing options
const router = require("./api/routes/index");

//connect to database
const mongoDB = require("./loaders/mongoDB");

app.use("/api/v1", router);

debugApp("Starting the application");
// Start the server

mongoDB
  .connectToDatabase()
  .then(() => {
    debugApp("Connected to database");

    app.listen(port, () => {
      debug("Listening on port " + port);
    });
    debugApp("Server started on port " + port);
  })
  .catch((error) => {
    debugApp("Error connecting to database");
    debugApp(error);
  });
