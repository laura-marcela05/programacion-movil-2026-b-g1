const jwt = require("jsonwebtoken");

// Revisa la cabecera Authorization: Bearer <token>.
// El servidor no guarda sesiones: le basta con verificar la firma y el vencimiento.
function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization || "";
  const [tipo, token] = cabecera.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ error: "Debes iniciar sesión para continuar" });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: datos.sub }; // quién pide sale del token, no del cuerpo
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Tu sesión venció" });
    }
    return res.status(401).json({ error: "Tu sesión no es válida" });
  }
}

module.exports = verificarToken;
