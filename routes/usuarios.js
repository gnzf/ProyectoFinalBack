const express = require("express");
const { playlistUsuario, usuarioUsername } = require("../controllers/usuarios");


const router = express.Router();


router.get("/playlistUsuario", playlistUsuario);
router.get("/username", usuarioUsername);

module.exports = router;