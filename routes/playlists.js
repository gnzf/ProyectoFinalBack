const express = require("express");

const { verifyToken } = require("../middlewares/auth");
const { loggerGet, loggerPost } = require("../middlewares/logger");
const { cancionesFilter, playlistAdd, playlistSongsAdd } = require("../controllers/playlistsController");

const router = express.Router();

router.get("/cancionesPlaylist", loggerGet, cancionesFilter);
router.post("/addPlaylist", playlistAdd);
router.post("/addCancionesPlaylist", playlistSongsAdd);


module.exports = router;