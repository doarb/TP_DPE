const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
var authControler = require("../controllers/auth");

router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: config.name + " REST API",
    urlAPI: config.urlAPI + " more information",
  });
});

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a token.
 *       400:
 *         description: There was a problem with the request.
 */
router.post("/login", authControler.login);

/**
 * @swagger
 * /api/v1/auth/refreshToken:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Refresh the token
 *     responses:
 *       200:
 *         description: Returns a new token.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 */
router.get("/refreshToken", authControler.refreshToken);

debugRoutes("Routes auth initialized successfully");
module.exports = router;
