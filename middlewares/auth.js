const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Acceso al recurso denegado" });
    return;
  }
  try {
    //verifico que el token sea valido
    const verified = jwt.verify(token, "mifirma");
    //cambiar la request: agrega un nuevo objeto denominado user.
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "El token es invalido", mensaje: error });
  }
};