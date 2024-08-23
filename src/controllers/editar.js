// Importando as tabelas do DB
const sala = require('../model/sala');
const aluno = require('../model/aluno');
const fs = require('fs');

module.exports = {

    async alunos(req, res){
    
        // Recebendo o id da URL
        const parametro = req.params.id;

        console.log(parametro);
    
        const alunos = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });
    
        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
    
        res.render('../views/editarAluno', {salas, alunos});
    },

    async adicionar(req, res){

        const dados = req.body;
        const id = req.params.id;

        // Excluindo aluno
        if (dados.envio == 'Excluir') {

            // Recebendo a antiga foto do aluno
            const antigaFoto = await aluno.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDAluno: id }
            });

            if (antigaFoto[0].Foto != 'icon-default.png') fs.unlink(`public/imgs/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));

            await aluno.destroy({ where: { IDAluno: id } });
            res.redirect('/');
            return;
        }

        // Se foi enviado alguma foto
        if (req.file) {

            // Recebendo a antiga foto do aluno
            const antigaFoto = await aluno.findAll({
                raw: true,
                attributes: ['Foto'],
                where: { IDAluno: id }
            });

            // Excluindo a foto da pasta
            if (antigaFoto[0].Foto != 'icon-default.png') fs.unlink(`public/imgs/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));
            
            // Update da nova foto no DB
            await aluno.update(
                {Foto: req.file.filename},
                {where: { IDAluno: id }}
            );
        }

        // Dando upgrade nas novas informações
        await aluno.update({
            Nome: dados.nome,
            Idade: dados.idade,
            Sexo: dados.sexo,
            IDSala: dados.sala
        },
        {
            where: { IDAluno: id }
        });

        console.log(dados);

        res.redirect('/');
    },

    async salas(req, res){
    
        // Recebendo o id da URL
        const parametro = req.params.id;
    
        const salas = await sala.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });
    
        const salaAtual = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome', 'Capacidade'] });
    
        res.render('../views/editarSala', {salas});
    },

    async adicionarSala(req, res){

        const dados = req.body;
        const id = req.params.id;

        // Excluindo aluno
        if (dados.envio == 'Excluir') {

            // Encontrando todas as salas disponíveis no SQL
            const alunos = await aluno.findAll({ raw: true, attributes: ['IDAluno', 'Foto'], where: { IDSala: id } });

            // Excluindo Alunos
            for (let i=0; i<alunos.length; i++) {
                
                const antigaFoto = await aluno.findAll({ 
                    raw: true, attributes: ['Foto'], 
                    where: { IDAluno: alunos[i].IDAluno } 
                });
                
                if (antigaFoto[0].Foto != 'icon-default.png') fs.unlink(`public/imgs/${antigaFoto[0].Foto}`, ( err => { if(err) console.log(err); } ));
                await aluno.destroy({ where: { IDAluno: alunos[i].IDAluno } });
            }

            await sala.destroy({ where: { IDSala: id } });

            res.redirect('/');
            return;
        }

        // Dando upgrade nas novas informações
        await sala.update({
            Nome: dados.nome,
            Capacidade: dados.capacidade
        },
        {
            where: { IDSala: id }
        });

        console.log(dados);

        res.redirect('/');
    }
}