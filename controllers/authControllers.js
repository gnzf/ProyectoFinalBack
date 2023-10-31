const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const register= async (req, res) => {
  const { email, username, password } = req.body;

  try {
    console.log("Registro iniciado"); //
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

    const userInserted = await knex("usuarios").where("email", email).first();
    const userId = userInserted.id_users; // Obten el ID del usuario registrado

    const token = jsonwebtoken.sign(
      {
        user_id: userId, // o cualquier otro identificador único del usuario
        email: userWithEmail ? userWithEmail.email : null,
        username: userWithUsername ? userWithUsername.username : null,
      },
      "mifirma" // Debes usar una clave secreta segura
    );
    console.log("Registro completado"); // 
    res.status(200).json({ mensaje: "Usuario creado correctamente", token: token, user_id: userId});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al registrar el usuario" });
  }
};


module.exports = {register};