const express = require("express");

const { allCanciones, allGeneros } = require("../controllers/canciones");

const router = express.Router();


router.get("/canciones", allCanciones);
router.get("/generos", allGeneros);

module.exports = router;