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

//--------- Times ---------
app.get("/times", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Time");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/times/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Time WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json("Not found");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.post("/times", async (req, res) => {
  try {
    const { nome } = req.body;
    const r = await db.query("INSERT INTO Time (nome) VALUES ($1) RETURNING *", [nome]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.put("/times/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;
    const r = await db.query("UPDATE Time SET nome = $1 WHERE id = $2 RETURNING *", [nome, id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Time não encontrado para atualização." });
    }
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.delete("/times/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await db.query("DELETE FROM Jogador WHERE id_time = $1", [id]);
    await db.query("DELETE FROM Time_Campeonato WHERE id_time = $1", [id]);
    const r = await db.query("DELETE FROM Time WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Time não encontrado." });
    }
    res.status(200).json({
      msg: "Time removido com sucesso.",
      time: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//--------- Jogadores ---------
app.get("/jogadores", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Jogador");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/jogadores/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Jogador WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json("Not found");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.post("/jogadores", async (req, res) => {
  try {
    const { nome, salario, id_time } = req.body;
    const r = await db.query("INSERT INTO Jogador (nome, salario, id_time) VALUES ($1, $2, $3) RETURNING *", [nome, salario, id_time]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.put("/jogadores/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const varre = await db.query("SELECT * FROM Jogador WHERE id = $1", [id]);
    if (varre.rows.length != 0) {
      const { nome, salario, id_time } = req.body;
      const r = await db.query("UPDATE Jogador SET nome=$1, salario=$2, id_time=$3 WHERE id=$4 RETURNING *", [nome, salario, id_time, id]);
      return res.status(200).json(r.rows[0]);
    }
    res.status(404).send("Id não encontrado");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.delete("/jogadores/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await db.query("DELETE FROM Jogador WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Jogador não encontrado." });
    }
    res.status(200).json({
      msg: "Jogador removido com sucesso.",
      jogador: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//--------- Campeonatos ---------
app.get("/campeonatos", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Campeonato");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.get("/campeonatos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Campeonato WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json({ msg: "Campeonato não encontrado." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.post("/campeonatos", async (req, res) => {
  try {
    const { nome } = req.body;
    const r = await db.query("INSERT INTO Campeonato (nome) VALUES ($1) RETURNING *", [nome]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.put("/campeonatos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;
    const r = await db.query("UPDATE Campeonato SET nome = $1 WHERE id = $2 RETURNING *", [nome, id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Campeonato não encontrado para atualização." });
    }
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.delete("/campeonatos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM Time_Campeonato WHERE id_campeonato = $1", [id]);
    const r = await db.query("DELETE FROM Campeonato WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Campeonato não encontrado." });
    }
    res.status(200).json({
      msg: "Campeonato removido com sucesso.",
      campeonato: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//--------- Routes e Listen ---------

const routes = require("./routes/rota");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
