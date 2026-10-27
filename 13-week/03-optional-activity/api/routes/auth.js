const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const usuarios = require("../data/usuarios");

const router = express.Router();

function claveCorrecta(clave, claveHash) {
  const [sal, hashGuardado] = claveHash.split(":");
  const hashEscrito = crypto.scryptSync(clave, sal, 64);
  return crypto.timingSafeEqual(hashEscrito, Buffer.from(hashGuardado, "hex"));
}

// POST /login es público. Siempre responde lo mismo si falla,
// para no revelar qué correos están registrados.
router.post("/login", (req, res) => {
  const { correo, clave } = req.body || {};

  if (typeof correo !== "string" || typeof clave !== "string" || !correo.trim() || !clave) {
    return res.status(400).json({ error: "Escribe tu correo y tu contraseña" });
  }

  const usuario = usuarios.find((u) => u.correo === correo.trim().toLowerCase());

  if (!usuario || !claveCorrecta(clave, usuario.claveHash)) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const token = jwt.sign({ sub: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  res.json({ token });
});

module.exports = router;
