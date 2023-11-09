const knex = require("../config/knexfile");

const playlistUsuario= async (req, res) => {
  const { usuarioId } = req.query;
    try {
      const resultado = await knex("playlists")
      .join('usuarios', 'playlists.user_id', '=', 'usuarios.id_users')
      .where("playlists.user_id", usuarioId )
      .select( 'playlists.*', 'usuarios.username')
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };


const usuarioUsername= async (req, res) => {
  const { usuarioId } = req.query;
  console.log("USUARIO ID : ", usuarioId)
    try {
      const resultado = await knex("usuarios")
      .where("usuarios.id_users", usuarioId)
      .select("username")
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };



  module.exports = { playlistUsuario, usuarioUsername}