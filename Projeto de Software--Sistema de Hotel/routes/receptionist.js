const express = require('express')
const Room = require('../models/Room')
const router = express.Router()
const Client = require('../models/Cadastro') 

// chama o arquivo do model


router.get('/index',(req, res) =>{
    res.render('receptionist/index')
})

////////////////////////////////////////////////////////
// Clientes //
////////////////////////////////////////////////////////

router.get('/addClient', (req, res) =>{
    Room.findAll({where: {'disponivel': true}}).then((quartos) => {
        res.render('receptionist/addClient', {quartos: quartos})
    })
})

router.post('/poscadastro', async (req, res) => {

    var erros =  []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: 'Nome Inválido'})
    }
    if (!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null){
        erros.push({texto: 'Sobrenome Inválido'})
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email Inválido'})
    }
    if (!req.body.number || typeof req.body.number == undefined || req.body.number == null){
        !erros.push({texto: 'Telefone Inválido'})
    }
    if (!req.body.checkin || typeof req.body.checkin == undefined || req.body.checkin == null){
        !erros.push({texto: 'Checkin Inválido'})
    }
    if (!req.body.checkout || typeof req.body.checkout == undefined || req.body.checkout == null){
        !erros.push({texto: 'Chekout Inválido'})
    }
    if (!req.body.nquarto || typeof req.body.nquarto == undefined || req.body.nquarto == null){
        !erros.push({texto: 'Escolha o numero do quarto'})
    }

    if(erros.length > 0){
        res.render('receptionist/addClient', {erros: erros})
    }else{

        Client.create({
            name: req.body.name,
            lastName: req.body.lastName, //referencia ao name="" do input do form
            email: req.body.email,
            number: req.body.number,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            nquarto: req.body.nquarto
        }).then(() => {
           Room.update({
            disponivel:false,
            idCliente: req.body.name
           }, {
            where: {
                numberq: req.body.nquarto
            }
           }) 
        }).then(() => {
            res.redirect('/receptionist/clients')
        }).catch((erro) => {
            res.send('Falha ao criar usuario' + erro)
        })
    }

})

router.get('/clients', (req,res) => {
    Client.findAll({order: [['id', 'ASC']]}).then((clientes) => {
        res.render('receptionist/clients', {clientes: clientes})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/receptionist/index')
    })
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

router.get('/edit/:id',(req, res) => {
    Client.findAll({where : {'id': req.params.id}}).then((clientes) => {
        res.render('receptionist/edit', {clientes: clientes})
    }).catch((erro) => {
        res.send('erro ao entrar no menu de edição' + erro)
    })
})

router.get('/deletar/:id', (req, res) => {
    Client.destroy({where: {'id': req.params.id}}).then(() => {
        res.render('receptionist/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

////////////////////////////////////////////////////////
// Quartos //
////////////////////////////////////////////////////////

router.get('/quartos', (req, res) => {
    Room.findAll({order: [['numberq','ASC']]}).then((quartos) => {
        res.render('receptionist/quartos', {quartos: quartos})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os quartos')
        res.redirect('/receptionist/index')
    })
})

router.get('/liberar/:numberq', (req, res) => {
    Room.update({
        disponivel: true
    },{where: {'numberq': req.params.numberq}}).then(() => {
        res.render('receptionist/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

module.exports = router