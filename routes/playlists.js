const express = require("express");

const { verifyToken } = require("../middlewares/auth");
const { loggerGet, loggerPost } = require("../middlewares/logger");
const { cancionesFilter, playlistAdd, playlistSongsAdd, playlistGeneradaSongsAll, calculateTotalDuration, artistsSongsFilter} = require("../controllers/playlistsController");

const router = express.Router();

router.get("/cancionesPlaylist", verifyToken, loggerGet, cancionesFilter);
router.post("/addPlaylist", verifyToken, playlistAdd);
router.post("/addCancionesPlaylist",  loggerPost, playlistSongsAdd);
router.get("/songsPlaylistGenerada", verifyToken, loggerGet, playlistGeneradaSongsAll);
router.get("/songsPlaylistTotalDuration", verifyToken, loggerGet, calculateTotalDuration);
router.get("/artistsSongs", verifyToken, loggerGet, artistsSongsFilter);

module.exports = router;