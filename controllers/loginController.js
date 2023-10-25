const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
    const { identifier, password } = req.body; // Cambia "email" a "identifier"
  
    try {
      // 1)chequear que existe el email o nombre_usuario
      const usuario = await knex("usuarios")
        .where("email", identifier)
        .orWhere("username", identifier);
  
      if (!usuario.length) {
        res.status(403).json({ error: "Email/nombre de usuario y/o contraseña incorrectos" });
        return;
      }
  
      // 2) chequear la password
      const validatePassword = await bcrypt.compare(
        password, 
        usuario[0].password
        );
  
      if (!validatePassword) {
        res.status(403).json({
          error: "Email/nombre de usuario y/o contraseña incorrectos",
        });
        return;
      }
  
      // 3) generar el token JWT.
      const token = jsonwebtoken.sign(
        {
          nombre: usuario[0].username,
          email: usuario[0].email, // PAYLOAD
       /*    perfil: usuario[0].perfil, */
        },
        "mifirma"
      );
  
      res
        .status(200)
        .json({ mensaje: "Inicio de sesión correcto", token: token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; 


module.exports = { login };