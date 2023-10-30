const express = require("express");

const { allCanciones, allGeneros, allActividades, allClima, allMoods } = require("../controllers/canciones");
const { verifyToken } = require("../middlewares/auth");
const { loggerGet } = require("../middlewares/logger");

const router = express.Router();


router.get("/canciones", loggerGet, allCanciones);
router.get("/generos", loggerGet, allGeneros);
router.get("/actividades", loggerGet, allActividades);
router.get("/climas", loggerGet, allClima);
router.get("/estadosdeanimo", loggerGet, allMoods);


module.exports = router;
