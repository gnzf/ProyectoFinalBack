const express = require("express");

const { allCanciones, allGeneros, allActividades, allClima, allMoods, allArtistas } = require("../controllers/canciones");
const { verifyToken } = require("../middlewares/auth");
const { loggerGet } = require("../middlewares/logger");

const router = express.Router();


router.get("/canciones", verifyToken, loggerGet, allCanciones);
router.get("/generos", verifyToken, loggerGet, allGeneros);
router.get("/actividades", verifyToken,  loggerGet, allActividades);
router.get("/climas", verifyToken,  loggerGet, allClima);
router.get("/estadosdeanimo", verifyToken, loggerGet, allMoods);
router.get("/artistasAll", verifyToken, loggerGet, allArtistas);


module.exports = router;
