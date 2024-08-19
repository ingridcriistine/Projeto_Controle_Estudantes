const Sequelize = require('sequelize');
const database = require('../config/bd');
const sala = require('../model/sala');

const aluno = database.define('Aluno', {
    IDAluno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Sexo: {
        type: Sequelize.STRING(20),
        allowNull: false
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