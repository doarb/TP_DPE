const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
const dpeControler = require("../controlers/dpe");
const authWithToken = require("../../middlewares/authwithtoken");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

router.get(
  "/search",
  authWithToken.authenticateToken,
  dpeControler.getSearchDPE
);

debugRoutes("Routes dpe initialized successfully");
module.exports = router;
