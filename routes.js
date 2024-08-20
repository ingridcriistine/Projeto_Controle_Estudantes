// Iniciando Route do Express
const express = require('express');
const route = express.Router();
const cadastro = require('./src/controllers/cadastro');

// Importando os Controllers
const home = require('./src/controllers/home');

// Iniciando Multer
const multer = require("multer");

// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');


// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.get('/index', home.pagInicialGet);

route.post('/', home.pagInicialPost);
route.post('/index', home.pagInicialPost);

route.get('/cadastroSala', cadastro.sala);
route.post('/cadastroSala', cadastro.salaInsert);

route.get('/cadastroAluno', cadastro.aluno);
route.post('/cadastroAluno', cadastro.alunoInsert);

// Cadastro de aluno irá receber um arquivo com o "name" do HTML chamado de "foto"
route.post('/cadastroAluno', multer(config).single('foto'), cadastro.alunoInsert);

module.exports = route;