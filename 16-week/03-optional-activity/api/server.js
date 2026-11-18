const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const comidasRoutes = require("./routes/comidas");
const verificarToken = require("./middleware/autenticacion");

if (!process.env.JWT_SECRET) {
  console.error("Falta JWT_SECRET. Copia .env.example a .env y escribe una clave.");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes); // POST /login es público
app.use("/comidas", verificarToken, comidasRoutes); // todo /comidas pide token

app.listen(3000, () => console.log("API en http://localhost:3000"));
