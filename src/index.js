const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");
const db = require("./db");
const campeonatos = require("./routes/campeonatos");
const jogadores = require("./routes/jogadores")
const times = require("./routes/times");
const participacao = require("./routes/participacao");

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

//--------- Routes e Listen ---------

const routes = require("./routes/rota");
app.use("/", routes);
app.use("/campeonatos", campeonatos);
app.use("/jogadores", jogadores);
app.use("/times", times);
app.use("/participacao", participacao);

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
