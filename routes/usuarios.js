const express = require("express");
const { playlistUsuario, usuarioUsername } = require("../controllers/usuarios");
const { verifyToken } = require("../middlewares/auth");


const router = express.Router();


router.get("/playlistUsuario", playlistUsuario);
router.get("/username", usuarioUsername);

module.exports = router;