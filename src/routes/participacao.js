const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const db = require("../db");
const router = express.Router();

router.post("/:id/times", async (req, res) => {
  try {
    const id_campeonato = req.params.id;  
    const { id_time } = req.body;         
    
    const r = await db.query(
      "INSERT INTO Time_Campeonato (id_time, id_campeonato) VALUES ($1, $2) RETURNING *",
      [id_time, id_campeonato]
    );
    
    res.status(201).json(r.rows[0]);
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(400).json({ msg: "Time já está neste campeonato" });
    }
    if (err.code === '23503') {
      return res.status(400).json({ msg: "Time ou campeonato não existe" });
    }
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id/times/:id_time", async (req, res) => {
  try {
    const id_campeonato = req.params.id;
    const id_time = req.params.id_time;

    const r = await db.query(
      "DELETE FROM Time_Campeonato WHERE id_campeonato = $1 AND id_time = $2 RETURNING *",
      [id_campeonato, id_time]
    );

    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Relação entre time e campeonato não encontrada." });
    }

    res.status(200).json({
      msg: "Time removido do campeonato com sucesso.",
      relacao: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;