const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
const searchesControler = require("../controllers/searches");
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
 * /api/v1/searches/me:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: List all the previous searches of the current user
 *     responses:
 *       200:
 *         description: Returns a list of all the previous searches of the current user.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 */
router.get("/me", authWithToken.authenticateToken, searchesControler.saveAll);

/**
 * @swagger
 * /api/v1/searches/del/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a search from the list based on the user and the id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the search to delete.
 *     responses:
 *       200:
 *         description: The search was successfully deleted.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 */
router.delete(
  "/del/:id",
  authWithToken.authenticateToken,
  searchesControler.deleteSearch
);

/**
 * @swagger
 * /api/v1/searches/reload/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Search a search based on the user with the search id and delete the old search
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the search to reload.
 *     responses:
 *       200:
 *         description: The search was successfully reloaded.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 */
router.get(
  "/reload/:id",
  authWithToken.authenticateToken,
  searchesControler.reload
);

debugRoutes("Routes searches initialized successfully");
module.exports = router;
