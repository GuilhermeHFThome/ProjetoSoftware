const express = require('express')
const Room = require('../models/Room')
const router = express.Router()
const Client = require('../models/Cadastro') // chama o arquivo do model
const User = require('../models/Cadastro')

router.get('/index', (req, res) => {
    res.render('admin/index')
})

router.get('/listarreservas', (req, res) => {
    res.send('Pagina de listar reservas')
})

router.get('/cadastrar', (req, res) => {
    res.send('Pagina de cadastro')
})

router.get('/addUser', (req, res) =>{
    res.render('admin/addUser')
})

router.post('/poscadastroUser', (req, res) => {

    var erros =  []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: 'Nome inválido'})
    }
    if (!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null){
        erros.push({texto: 'Sobrenome inválido'})
    }
    if (!req.body.login || typeof req.body.login == undefined || req.body.login == null){
        erros.push({texto: 'Usuário inválido'})
    }
    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto: 'Senha inválida'})
    }


    if(erros.length > 0){
        res.render('admin/addUser', {erros: erros})
    }else{

        User.create({
            name: req.body.name,
            lastName: req.body.lastName,
            login: req.body.login,
            password: req.body.password, //referencia ao name="" do input do form
        }).then(() => {
            res.redirect('/admin/users')
        }).catch((erro) => {
            res.send('Falha ao criar usuario')
        })
    }

})

router.get('/users', (req,res) => {
    User.findAll({order: [['id', 'DESC']]}).then((usuarios) => {
        res.render('admin/users', {usuarios: usuarios})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os usuarios')
        res.redirect('/admin/index')
    })
})

router.get('/clients', (req,res) => {
    Client.findAll({order: [['id', 'DESC']]}).then((clientes) => {
        res.render('admin/clients', {clientes: clientes})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/admin/index')
    })
})

router.get('/addClient', (req, res) =>{
    res.render('admin/addClient')
})

router.get('/searched/:id', (req, res) => {
    Client.findAll({where: {'id': req.params.id}}).then((clientes) => {
        res.render('admin/searched', {clientes: clientes})
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
        res.redirect('/admin/clients')
    })
})

router.get('/edit/:id',(req, res) => {
    Client.findAll({where : {'id': req.params.id}}).then((clientes) => {
        res.render('admin/edit', {clientes: clientes})
    }).catch((erro) => {
        res.send('erro ao entrar no menu de edição' + erro)
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



router.get('/addClient', (req, res) =>{
    res.render('admin/addClient')
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
        res.render('admin/addClient', {erros: erros})
    }else{

        Client.create({
            name: req.body.name,
            lastName: req.body.lastName, //referencia ao name="" do input do form
            cpf: req.body.cpf,
            address : req.body.address,
            number: req.body.number,
            id: req.body.id
        }).then(() => {
            res.redirect('/admin/clients')
        }).catch((erro) => {
            res.send('Falha ao criar usuario')
        })
    }

})

router.get('/deletar/:id', (req, res) => {
    Client.destroy({where: {'id': req.params.id}}).then(() => {
        res.render('admin/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

module.exports = router