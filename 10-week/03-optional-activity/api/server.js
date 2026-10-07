const express = require("express");
const cors = require("cors");
const comidasRoutes = require("./routes/comidas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/comidas", comidasRoutes);

app.listen(3000, () => console.log("API en http://localhost:3000"));
