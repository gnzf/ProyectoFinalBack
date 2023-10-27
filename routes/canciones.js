const express = require("express");

const { allCanciones, allGeneros, allActividades, allClima, allMoods } = require("../controllers/canciones");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();


router.get("/canciones",allCanciones);
router.get("/generos",allGeneros);
router.get("/actividades",allActividades);
router.get("/climas",allClima);
router.get("/estadosdeanimo",allMoods);

module.exports = router;
