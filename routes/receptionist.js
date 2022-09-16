const express = require('express')
const Room = require('../models/Room')
const router = express.Router()
const Client = require('../models/Cadastro') // chama o arquivo do model


router.get('/index',(req, res) =>{
    res.render('receptionist/index')
})


router.get('/searched/:id', (req, res) => {
    Client.findAll({where: {'id': req.params.id}}).then((clientes) => {
        res.render('receptionist/searched', {clientes: clientes})
    }).catch((erro) => {
        res.send('Esse cliente nao existe' + erro)
    })
})

router.post('/edit', (req, res) => {
        Client.update({
            name: req.body.name,
            lastName: req.body.lastName, 
            cpf: req.body.cpf,
            address : req.body.address,
            number: req.body.number,
            id: req.body.id
        },{where: {id: req.body.id}}).then(() => {
            res.flash('success_msg', "cliente editado com sucesso")
            res.redirect('/clients')
        }).catch((err) => {
            console.log(JSON.stringify(req.body))
            res.redirect('/receptionist/clients')
        })
    })


router.get('/reserva', (req, res) => {
    Room.findAll({order: [['number','ASC']]}).then((quartos) => {
        res.render('receptionist/reserva', {quartos: quartos})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os quartos')
        res.redirect('/receptionist/index')
    })
})

router.get('/edit/:id',(req, res) => {
    Client.findAll({where : {'id': req.params.id}}).then((clientes) => {
        res.render('receptionist/edit', {clientes: clientes})
    }).catch((erro) => {
        res.send('erro ao entrar no menu de edição' + erro)
    })
})

router.get('/clients', (req,res) => {
    Client.findAll({order: [['id', 'DESC']]}).then((clientes) => {
        res.render('receptionist/clients', {clientes: clientes})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/receptionist/index')
    })
})



router.get('/addClient', (req, res) =>{
    res.render('receptionist/addClient')
})

router.post('/poscadastro', (req, res) => {

    var erros =  []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: 'invalid name'})
    }
    if (!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null){
        erros.push({texto: 'invalid last name'})
    }
    if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
        erros.push({texto: 'invalid cpf'})
    }
    if (!req.body.address || typeof req.body.address == undefined || req.body.address == null){
        erros.push({texto: 'invalid address'})
    }
    if (!req.body.number || typeof req.body.number == undefined || req.body.number == null){
        !erros.push({texto: 'invalid number'})
    }

    if(erros.length > 0){
        res.render('receptionist/addClient', {erros: erros})
    }else{

        Client.create({
            name: req.body.name,
            lastName: req.body.lastName, //referencia ao name="" do input do form
            cpf: req.body.cpf,
            address : req.body.address,
            number: req.body.number,
            id: req.body.id
        }).then(() => {
            res.redirect('/receptionist/clients')
        }).catch((erro) => {
            res.send('Falha ao criar usuario')
        })
    }

})

router.get('/deletar/:id', (req, res) => {
    Client.destroy({where: {'id': req.params.id}}).then(() => {
        res.render('receptionist/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

module.exports = router