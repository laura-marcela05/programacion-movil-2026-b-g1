const express = require("express");
const router = express.Router();
const comidas = require("../data/comidas");

function esTextoValido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

// Cada usuario ve solo sus comidas: el id sale del token (req.usuario.id).
router.get("/", (req, res) => {
  res.json(comidas.filter((c) => c.usuario_id === req.usuario.id));
});

router.get("/:id", (req, res) => {
  const comida = comidas.find(
    (c) => c.id === Number(req.params.id) && c.usuario_id === req.usuario.id
  );

  if (!comida) {
    return res.status(404).json({ error: "Comida no encontrada" });
  }

  res.json(comida);
});

router.post("/", (req, res) => {
  const { franja, descripcion } = req.body;

  if (!esTextoValido(franja) || !esTextoValido(descripcion)) {
    return res.status(400).json({ error: "La franja y la descripción son obligatorias" });
  }

  const nueva = {
    id: comidas.length + 1,
    usuario_id: req.usuario.id, // el dueño lo pone el servidor
    franja: franja.trim(),
    descripcion: descripcion.trim(),
    fecha: new Date().toISOString(),
  };

  comidas.push(nueva);
  res.status(201).json(nueva);
});

module.exports = router;
