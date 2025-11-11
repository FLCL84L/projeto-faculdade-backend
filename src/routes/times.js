const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /times:
 *   get:
 *     summary: Retorna todos os times
 *     description: Lista todos os times cadastrados no sistema
 *     tags: [Times]
 *     responses:
 *       200:
 *         description: Lista de times retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Corinthians"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times/{id}:
 *   get:
 *     summary: Retorna um time específico
 *     description: Obtém os dados de um time pelo seu ID
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Time encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Corinthians"
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times/{id}/jogadores:
 *   get:
 *     summary: Retorna os jogadores de um time
 *     description: Lista todos os jogadores de um time específico
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Rodrigo Garro"
 *                   salario:
 *                     type: number
 *                     format: float
 *                     example: 800000.00
 *                   id_time:
 *                     type: integer
 *                     example: 1
 *       404:
 *         description: Nenhum jogador encontrado neste time
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times/{id}/campeonatos:
 *   get:
 *     summary: Retorna os campeonatos de um time
 *     description: Lista todos os campeonatos que um time participa
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de campeonatos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Mundial de clubes"
 *       404:
 *         description: Nenhum campeonato encontrado para este time
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times:
 *   post:
 *     summary: Cria um novo time
 *     description: Adiciona um novo time ao sistema
 *     tags: [Times]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Time FC"
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 nome:
 *                   type: string
 *                   example: "Novo Time FC"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times/{id}:
 *   put:
 *     summary: Atualiza um time
 *     description: Atualiza os dados de um time existente
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Corinthians Paulista"
 *     responses:
 *       200:
 *         description: Time atualizado com sucesso
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /times/{id}:
 *   delete:
 *     summary: Remove um time
 *     description: Exclui um time do sistema
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Time removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Time removido com sucesso."
 *                 time:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "Corinthians"
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Time");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Time WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json({ msg: "Time não encontrado."} );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id/jogadores", async (req, res) => {
  try{
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Jogador WHERE id_time = $1", [id]);
    if(r.rows.length > 0){
      return res.json(r.rows);
    }
    res.status(404).json({ msg: "Nenhum jogador encontrado neste time." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id/campeonatos", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await db.query(
      `SELECT c.id, c.nome
       FROM Campeonato c
       INNER JOIN Time_Campeonato tc ON c.id = tc.id_campeonato
       WHERE tc.id_time = $1`,
      [id]
    );
    if (r.rows.length > 0) {
      return res.json(r.rows);
    }
    res.status(404).json({ msg: "Nenhum campeonato encontrado para este time." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;
    const r = await db.query("INSERT INTO Time (nome) VALUES ($1) RETURNING *", [nome]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
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

module.exports = router;
