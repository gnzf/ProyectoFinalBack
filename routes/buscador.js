const express = require("express");

const { buscadorCanciones } = require("../controllers/buscador");
const { verifyToken } = require("../middlewares/auth");
const { loggerGet } = require("../middlewares/logger");

const router = express.Router();


router.get("/buscador", loggerGet, buscadorCanciones);

module.exports = router;