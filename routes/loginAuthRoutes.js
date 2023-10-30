const express = require("express");
const { login } = require("../controllers/logincontroller");
const { verifyToken } = require("../middlewares/auth");

const { runValidation } = require("../middlewares/validators/indexValidator");
const { datosLogIn } = require("../middlewares/validators/loginValidator");

const router = express.Router();


router.post("/login", datosLogIn, runValidation, login);

module.exports = router;