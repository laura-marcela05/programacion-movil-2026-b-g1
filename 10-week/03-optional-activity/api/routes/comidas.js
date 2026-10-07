const express = require("express");
const router = express.Router();
const comidas = require("../data/comidas");

function esTextoValido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

router.get("/", (req, res) => {
  res.json(comidas);
});

router.get("/:id", (req, res) => {
  const comida = comidas.find((c) => c.id === Number(req.params.id));

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
    franja: franja.trim(),
    descripcion: descripcion.trim(),
    fecha: new Date().toISOString(),
  };

  comidas.push(nueva);
  res.status(201).json(nueva);
});

module.exports = router;
