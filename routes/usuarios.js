const express = require("express");
const { playlistUsuario, usuarioUsername } = require("../controllers/usuarios");
const { verifyToken } = require("../middlewares/auth");


const router = express.Router();


router.get("/playlistUsuario", verifyToken, playlistUsuario);
router.get("/username", verifyToken, usuarioUsername);

module.exports = router;