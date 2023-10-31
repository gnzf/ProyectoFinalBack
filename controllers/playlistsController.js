const knex = require("../config/knexfile");

const cancionesFilter = async (req, res) => {
  const { genero, estadodeanimo, actividad, clima } = req.body;

  const query = knex("canciones")
    .join("artistas", "canciones.artist_id", "=", "artistas.id_artist")
    .select(
      "canciones.cancion_name",
      "canciones.duration",
      "artistas.name_artist",
      "canciones.id_canciones"
    );

  if (actividad || estadodeanimo || clima || genero) {
    // Comenzamos con una condición falsa para que el primer "OR" funcione correctamente
    query.where(false);

    if (actividad) {
      const actividadID = await knex("actividades")
        .where("activity_name", actividad)
        .select("id_activity")
        .first();
      query.orWhere("activity_id", actividadID.id_activity);
    }

    if (estadodeanimo) {
      const estadoDeAnimoID = await knex("estadosdeanimo")
        .where("mood_name", estadodeanimo)
        .select("id_mood")
        .first();
      query.orWhere("mood_id", estadoDeAnimoID.id_mood);
    }

    if (clima) {
      const climaID = await knex("climas")
        .where("climates_name", clima)
        .select("id_climates")
        .first();
      query.orWhere("climates_id", climaID.id_climates);
    }

    if (genero) {
      const generoId = await knex("generos")
        .where("genre_name", genero)
        .select("id_genre")
        .first();
      query.orWhere("genre_id", generoId.id_genre);
    }
  }

  try {
    const result = await query;

    if (result.length) {
      console.log("este es el resultado", result)
      res.json(result);
    } else {
      res.status(404).json({
        error: "No se ha encontrado un registro con esos filtros",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const playlistAdd = async (req, res) => {
  const { user_id } = req.body;

  try {
    const playlistId = await knex("playlists")
      .insert({
        user_id: user_id
      })
      .returning("id_playlist");

    res.json({ id_playlist: playlistId[0], user_id: user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const playlistSongsAdd = async (req, res) => {
  const { cancionName } = req.body;

  try {
    const cancion = await knex('canciones')
      .where('cancion_name', cancionName)
      .select('id_canciones')
      .first();

    if (!cancion) {
      return res.status(404).json({
        error: 'No se ha encontrado una canción con ese nombre',
      });
    }

    // Obtener el último playlistID insertado en la tabla "playlists"
    const lastPlaylistId = await knex('playlists')
      .select('id_playlist')
      .orderBy('id_playlist', 'desc')
      .first();

    if (!lastPlaylistId) {
      return res.status(404).json({
        error: 'No se ha encontrado ningún registro en la tabla playlists',
      });
    }

    // Insertar la relación entre la playlist y la canción en "canciones_playlists"
    await knex('canciones_playlists').insert({
      playlist_id: lastPlaylistId.id_playlist,
      canciones_id: cancion.id_canciones,
    });

    res.json({
      message: 'Datos ingresados en canciones_playlists correctamente',
      playlist_id: lastPlaylistId.id_playlist,
      canciones_id: cancion.id_canciones,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = { cancionesFilter, playlistAdd, playlistSongsAdd};
