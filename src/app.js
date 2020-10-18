const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// { id , title, url , techs, likes}

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repositorie = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id)

  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }

  const repositorieAltered = { ...repositories[indexRepositorie], title, url, techs }
  repositories[indexRepositorie] = repositorieAltered

  return response.json(repositorieAltered)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id)

  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }

  repositories.splice(indexRepositorie, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const indexRepositorie = repositories.findIndex(repositorie => repositorie.id === id)

  if (indexRepositorie < 0) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }

  repositories[indexRepositorie].likes += 1

  return response.json(repositories[indexRepositorie])
});

module.exports = app;
