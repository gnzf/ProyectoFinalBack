const knex = require("../config/knexfile");

const cancionesFilter = async (req, res) => {
  const { genero, estadoDeAnimo, actividad, clima } = req.body;
  try {
    const actividadID = await knex("actividades")
      .where("activity_name", actividad)
      .select("id_activity")
      .first();
    const estadoDeAnimoID = await knex("estadosdeanimo")
      .where("mood_name", estadoDeAnimo)
      .select("id_mood")
      .first();
    const climaID = await knex("climas")
      .where("climates_name", clima)
      .select("id_climates")
      .first();
    const generoId = await knex("generos")
      .where("genre_name", genero)
      .select("id_genre")
      .first();

    const result = await knex("canciones")
      .join("artistas", "canciones.artist_id", "=", "artistas.id_artist")
      .select(
        "canciones.cancion_name",
        "canciones.duration",
        "artistas.name_artist"
      )
      .where({
        activity_id: actividadID.id_activity,
        mood_id: estadoDeAnimoID.id_mood,
        climates_id: climaID.id_climates,
        genre_id: generoId.id_genre,
      });
      
    if (result.length) {
      res.json(result);
    } else {
      res.status(404).json({
        error: "No se ha encontrado un registro con ese id",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { cancionesFilter, playlistAdd, playlistSongsAdd };
