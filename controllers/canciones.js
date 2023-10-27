const knex = require("../config/knexfile");

const allCanciones= async (req, res) => {
    try {
      const resultado = await knex("canciones")
      .join('artistas', 'canciones.artist_id', '=', 'artistas.id_artist')
      .select('canciones.*', 'artistas.name_artist')
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

const allGeneros = async (req,res) =>{
  try {
    const resultado = await knex("generos");
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const allMoods = async (req,res) =>{
  try {
    const resultado = await knex("estadosdeanimo");
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const allClima = async (req,res) =>{
  try {
    const resultado = await knex("climas");
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const allActividades = async (req,res) =>{
  try {
    const resultado = await knex("actividades");
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}


  module.exports = {allCanciones, allGeneros, allActividades, allClima, allMoods}