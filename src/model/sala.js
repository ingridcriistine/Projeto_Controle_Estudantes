// Importação
const Sequelize = require('sequelize');
const database = require('../config/bd');

// Criando a tabela Sala
const sala = database.define('Sala', {
    IDSala: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    Capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = sala;