const { register } = require("../controllers/authControllers");

const express = require("express");

const router = express.Router();

router.post("/register", register);




module.exports = router;