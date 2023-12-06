const express = require("express");
const router = express.Router();
const config = require("../../config/index").config;
const debugRoutes = require("debug")(config.name + ":routes");
const searchesControler = require("../controllers/searches");
const authWithToken = require("../../middlewares/authwithtoken");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

router.get(
  "/saveAll",
  authWithToken.authenticateToken,
  searchesControler.saveAll
);
router.delete(
  "/del/:id",
  authWithToken.authenticateToken,
  searchesControler.deleteSearch
);

router.get(
  "/reload/:id",
  authWithToken.authenticateToken,
  searchesControler.reload
);

debugRoutes("Routes searches initialized successfully");
module.exports = router;
