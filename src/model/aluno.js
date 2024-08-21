const Sequelize = require('sequelize');
const database = require('../config/bd');
const sala = require('../model/sala');

const aluno = database.define('Aluno', {
    IDAluno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: true
    },

    Idade: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    Sexo: {
        type: Sequelize.STRING(20),
        allowNull: true
    },

    Foto: {
        type: Sequelize.STRING(50),
        allowNull: true
    }
        
});

aluno.belongsTo(
    sala, {
    constraint: true, 
    //Garantir integridade referencial
    foreignKey: 'IDSala'
});

module.exports = aluno;