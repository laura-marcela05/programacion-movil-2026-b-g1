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

function crearClaveHash(clave) {
  const sal = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(clave, sal, 64).toString("hex");
  return `${sal}:${hash}`;
}

// POST /login es público. Siempre responde lo mismo si falla,
// para no revelar qué correos están registrados.
router.post("/login", (req, res) => {
  const { correo, clave } = req.body || {};

  if (
    typeof correo !== "string" ||
    typeof clave !== "string" ||
    !correo.trim() ||
    !clave
  ) {
    return res.status(400).json({ error: "Escribe tu correo y tu contraseña" });
  }

  const usuario = usuarios.find(
    (u) => u.correo === correo.trim().toLowerCase(),
  );

  if (!usuario || !claveCorrecta(clave, usuario.claveHash)) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const token = jwt.sign(
    { sub: usuario.id, nombre: usuario.nombre },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    },
  );

  res.json({ token });
});

// POST /registro es público. Crea el usuario en memoria; después la app
// inicia sesión con /login, así el token se emite en un solo lugar.
router.post("/registro", (req, res) => {
  const { nombre, correo, clave, objetivo } = req.body || {};

  if (typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({ error: "Escribe tu nombre" });
  }
  if (typeof correo !== "string" || !/^\S+@\S+\.\S+$/.test(correo.trim())) {
    return res.status(400).json({ error: "Escribe un correo válido" });
  }
  if (typeof clave !== "string" || clave.length < 8) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  const OBJETIVOS = ["bajar de peso", "mantenerse en el peso", "subir de peso"];
  if (
    typeof objetivo === "string" &&
    objetivo !== "" &&
    !OBJETIVOS.includes(objetivo)
  ) {
    return res.status(400).json({ error: "Elige un objetivo de la lista" });
  }

  const correoNormalizado = correo.trim().toLowerCase();
  if (usuarios.some((u) => u.correo === correoNormalizado)) {
    return res.status(409).json({ error: "Ese correo ya tiene una cuenta" });
  }

  const nuevo = {
    id: Math.max(0, ...usuarios.map((u) => u.id)) + 1,
    nombre: nombre.trim(),
    correo: correoNormalizado,
    claveHash: crearClaveHash(clave),
    objetivo: typeof objetivo === "string" ? objetivo : "",
  };
  usuarios.push(nuevo);

  res.status(201).json({ mensaje: "Cuenta creada" });
});

module.exports = router;
