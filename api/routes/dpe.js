const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
const dpeControler = require("../controllers/dpe");
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
 * /api/v1/dpe/search:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Search for DPE based on various parameters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_postal:
 *                 type: string
 *               DPE:
 *                 type: string
 *               GES:
 *                 type: string
 *               Surface:
 *                 type: string
 *               Date:
 *                 type: string
 *               dateDeDebut:
 *                 type: string
 *               dateDeFin:
 *                 type: string
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Returns the search results.
 *       400:
 *         description: There was a problem with the request.
 */
router.post(
  "/search",
  authWithToken.authenticateToken,
  dpeControler.getSearchDPE
);

debugRoutes("Routes dpe initialized successfully");
module.exports = router;
