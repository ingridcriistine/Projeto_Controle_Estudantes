// Iniciando Route do Express
const express = require('express');
const route = express.Router();
const cadastro = require('./src/controllers/cadastro');

// Importando os Controllers
const home = require('./src/controllers/home');

// Iniciando as rotas
route.get('/', home.pagInicialGet);

route.get('/cadastroSala', cadastro.sala);
route.post('/cadastroSala', cadastro.salaInsert);

route.get('/cadastroAluno', cadastro.aluno);
route.post('/cadastroAluno', cadastro.alunoInsert);

module.exports = route;