const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Define endereço do swagger
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }", // Remove a barra de identificação do swagger.
    customSiteTitle: "Documentação da API de exemplo",
  })
);

app.get("/Time", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Time");
    res.json = r.rows(0);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const routes = require("./routes/rota");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
