const express = require("express");

const { buscadorCanciones } = require("../controllers/buscador");

const router = express.Router();


router.get("/buscador", buscadorCanciones);

module.exports = router;