const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());             
app.use(express.json());     

let todos = [];
let nextId = 1;

// GET /todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos
app.post("/todos", (req, res) => {
  const { title } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Le champ "title" est requis.' });
  }
  const todo = { id: nextId++, title: title.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch("/todos/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo introuvable." });
  }
  todo.done = !todo.done;
  res.json(todo);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erreur serveur." });
});

app.listen(PORT, () => {
  console.log(`API sur http://localhost:${PORT}`);
});
