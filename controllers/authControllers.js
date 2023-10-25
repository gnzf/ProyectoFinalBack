const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const register= async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Verificar si ya existe un usuario con el mismo email
    const userWithEmail = await knex("usuarios").where("email", email).first();
    if (userWithEmail) {
      return res.status(400).json({ error: "Ya existe un usuario con ese email" });
    }

    // Verificar si ya existe un usuario con el mismo username
    const userWithUsername = await knex("usuarios").where("username", username).first();
    if (userWithUsername) {
      return res.status(400).json({ error: "Ya existe un usuario con ese nombre de usuario" });
    }

    // Si no existe el email ni el username, procedemos a crear el usuario
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(password, salt);

    await knex("usuarios").insert({
      email: email,
      username: username,
      password: passwordEncrypt,
    });

    res.status(200).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al registrar el usuario" });
  }
};

/* const register1 = async (req, res) => {
  const { email} = req.body;


  //2) que no exista username, email
  try {
    const existeEmail = await knex("usuarios").where("email", email);
    if (existeEmail.length) {
      res.status(400).json({ error: "Ya existe un registro con ese email" });
      return;
    }
    await knex("usuarios").insert({
      email: email,
      password: password,
      username: username
    });
    //3) esta todo ok, insertamos. Si no, respuesta de error

    res.status(200).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */


module.exports = {register};