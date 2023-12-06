const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
const userControler = require("../controllers/users");
const authWithToken = require("../../middlewares/authwithtoken");

router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: config.name + " REST API",
    urlAPI: config.urlAPI + " more information",
  });
});

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the current user
 *     responses:
 *       200:
 *         description: Returns the current user.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 */
router.get("/me", authWithToken.authenticateToken, userControler.getUser);

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
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
 *       201:
 *         description: The user was successfully created.
 *       400:
 *         description: There was a problem with the request.
 */
router.post("/create", userControler.createUser);

debugRoutes("Routes users initialized successfully");
module.exports = router;
