const { check } = require("express-validator");

const datosLogIn = [
  check("user_email")
    .not()
    .isEmpty()
    .withMessage("Email/User es un campo requerido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password es un campo requerido")
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Debe contener minimo 8 caracteres y 30 caracteres como maximo"
    ),
];

module.exports = { datosLogIn };
