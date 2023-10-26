const knex = require("../config/knexfile");

const playlistUsuario= async (req, res) => {
    try {
      const resultado = await knex("playlists")
      .join('canciones_playlists', 'canciones_playlists.playlist_id', '=', 'playlists.id_playlist')
      .select('canciones_playlists.*', 'playlists.*')
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };


const usuarioUsername= async (req, res) => {
    try {
      const resultado = await knex("usuarios")
      .select("username")
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };



  module.exports = { playlistUsuario, usuarioUsername}