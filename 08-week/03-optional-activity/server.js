const express = require("express");
const app = express();
app.use(express.json());

let comidas = [
  { id: 1, franja: "Desayuno", descripcion: "Avena con fruta" },
];

// GET /comidas -> lista todas las comidas registradas
app.get("/comidas", (req, res) => {
  res.json(comidas);
});

// POST /comidas -> crea una nueva comida
app.post("/comidas", (req, res) => {
  const { franja, descripcion } = req.body;

  if (!franja || !descripcion) {
    return res.status(400).json({ error: "Franja y descripción son obligatorios" });
  }

  const nuevaComida = {
    id: comidas.length + 1,
    franja,
    descripcion,
  };

  comidas.push(nuevaComida);
  res.status(201).json(nuevaComida);
});

app.listen(3000, () => console.log("API en http://localhost:3000"));
