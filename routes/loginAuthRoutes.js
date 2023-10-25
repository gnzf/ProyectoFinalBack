const express = require("express");
const { login } = require("../controllers/logincontroller");

const router = express.Router();


router.post("/auth/login", login);

module.exports = router;