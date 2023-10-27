const express = require("express");
const { login } = require("../controllers/logincontroller");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();


router.post("/login",login);

module.exports = router;