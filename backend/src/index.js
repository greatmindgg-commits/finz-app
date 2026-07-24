const express = require("express");
const { pool, init } = require("./db");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "finz-app API is alive" });
});

app.get("/api/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  res.json(result.rows);
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "title and content required" });
  const result = await pool.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  res.status(201).json(result.rows[0]);
});

init().then(() =>
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`))
);
