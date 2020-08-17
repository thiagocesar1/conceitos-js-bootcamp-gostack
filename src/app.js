const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { 
    title, url, techs
  } = request.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    like: 0
  }

  repositories.push(repository);

  response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { 
    title, url, techs
  } = request.body;
   
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(404).json({ error: "Repository not found. "});
  }

  const like = repositories[repositoryIndex].like;

  const repository = {
    id,
    title,
    url,
    techs,
    like
  }

  repositories[repositoryIndex] = repository;
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(404).json({ error: "Repository not found. "});
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(404).json({ error: "Repository not found. "});
  }

  let repository = repositories[repositoryIndex];
  repository.like += 1;

  return response.status(200).json(repository);
});

module.exports = app;
