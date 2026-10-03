const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let comidas = [
  { id: 1, franja: "Desayuno", descripcion: "Avena con fruta", fecha: "2026-10-01T07:30:00" },
  { id: 2, franja: "Almuerzo", descripcion: "Arroz con pollo y ensalada", fecha: "2026-10-01T12:45:00" },
  { id: 3, franja: "Cena", descripcion: "Sopa de verduras", fecha: "2026-10-01T19:15:00" },
  { id: 4, franja: "Desayuno", descripcion: "Huevos revueltos con arepa", fecha: "2026-10-02T07:10:00" },
  { id: 5, franja: "Almuerzo", descripcion: "Lentejas con arroz", fecha: "2026-10-02T13:00:00" },
];

// GET /comidas -> lista todas las comidas registradas
app.get("/comidas", (req, res) => {
  res.json(comidas);
});

// GET /comidas/:id -> una sola comida, o 404 si no existe
app.get("/comidas/:id", (req, res) => {
  const comida = comidas.find((c) => c.id === Number(req.params.id));

  if (!comida) {
    return res.status(404).json({ error: "Comida no encontrada" });
  }

  res.json(comida);
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
    fecha: new Date().toISOString(),
  };

  comidas.push(nuevaComida);
  res.status(201).json(nuevaComida);
});

app.listen(3000, () => console.log("API en http://localhost:3000"));
