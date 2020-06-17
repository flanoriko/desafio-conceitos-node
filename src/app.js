const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const techs = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const likes = 0;
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes };
  
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositorytIndex = fn_get_repository_index(id, response);
  const likes = repositories[repositorytIndex].likes; //Guardando os likes para não ser atualizado por fora
  const repository = { id, title, url, techs, likes };

  repositories[repositorytIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorytIndex = fn_get_repository_index(id, response);

  repositories.splice(repositorytIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorytIndex = fn_get_repository_index(id, response);

  repositories[repositorytIndex].likes = repositories[repositorytIndex].likes + 1;

  return response.json(repositories[repositorytIndex]);

});

function fn_get_repository_index(id, response) {
  const repositorytIndex = repositories.findIndex(repo => repo.id == id);

  if (repositorytIndex < 0) {
    return response.status(400).json({ "error": 'nao encontrado' });
  }

  return repositorytIndex;

}

module.exports = app;
