const express = require("express");
const { login } = require("../controllers/logincontroller");

const router = express.Router();


router.post("/login", login);

module.exports = router;