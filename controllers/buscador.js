const knex = require("../config/knexfile");

const buscadorCanciones= async (req, res) => {
    try {
      const resultado = await knex("canciones")
    .join('artistas', 'canciones.artist_id', '=', 'artistas.id_artist')
    .select('canciones.*', 'artistas.name_artist')
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }; 


  module.exports = {buscadorCanciones}