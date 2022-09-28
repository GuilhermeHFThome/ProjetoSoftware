const express = require('express')
const Room = require('../models/Room')
const router = express.Router()
const Client = require('../models/Cadastro') 
const User = require('../models/CadastroUser')
const bcrypt = require('bcryptjs')
// chama o arquivo do model

router.get('/index', (req, res) => {
    res.render('admin/index')
})

router.get('/listarreservas', (req, res) => {
    res.send('Pagina de listar reservas')
})

router.get('/cadastrar', (req, res) => {
    res.send('Pagina de cadastro')
})


////////////////////////////////////////////////////////
// Clientes //
////////////////////////////////////////////////////////

router.get('/addClient', (req, res) =>{
    Room.findAll({where: {'disponivel': true}}).then((quartos) => {
        res.render('admin/addClient', {quartos: quartos})
    })
})


router.post('/poscadastro', (req, res) => {

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
        res.render('admin/addClient', {erros: erros})
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
            res.redirect('/admin/clients')
        }).catch((erro) => {
            res.send('Falha ao criar usuario' + erro)
        })
    }

})

router.get('/clients', (req,res) => {
    Client.findAll({order: [['id', 'ASC']]}).then((clientes) => {
        res.render('admin/clients', {clientes: clientes})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os clientes')
        res.redirect('/admin/index')
    })
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
        email: req.body.email,
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

router.get('/deletar/:id', (req, res) => {
    Client.destroy({where: {'id': req.params.id}}).then(() => {
        res.render('admin/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

/////////////////////////////////////////////////////////
// Usuarios //
////////////////////////////////////////////////////////

router.get('/addUser', (req, res) =>{
    res.render('admin/addUser')
})

router.post('/poscadastroUser', async (req, res) => {

    var erros =  []

    if (!req.body.nameU || typeof req.body.nameU == undefined || req.body.nameU == null){
        erros.push({texto: 'Nome inválido'})
    }
    if (!req.body.lastNameU || typeof req.body.lastNameU == undefined || req.body.lastNameU == null){
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

        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            nameU: req.body.nameU,
            lastNameU: req.body.lastNameU,
            login: req.body.login,
            password: hashedPassword, //referencia ao name="" do input do form
        }).then(() => {
            res.redirect('/admin/users')
        }).catch((erro) => {
            res.send('Falha ao criar usuario'+erro)
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

router.get('/searchedUser/:id', (req, res) => {
    User.findAll({where: {'id': req.params.id}}).then((usuarios) => {
        res.render('admin/searchedUser', {usuarios: usuarios})
    }).catch((erro) => {
        res.send('Esse Usuário nao existe' + erro)
    })
})

router.post('/editUser', (req, res) => {
    User.update({
        nameU: req.body.nameU,
        lastNameU: req.body.lastNameU,
        login: req.body.login,
        password: req.body.password,
        id: req.body.id
    },{where: {id: req.body.id}}).then(() => {
        res.flash('success_msg', "Usuário editado com sucesso")
        res.redirect('/users')
    }).catch((err) => {
        console.log(JSON.stringify(req.body))
        res.redirect('/admin/users')
    })
})

router.get('/editUser/:id',(req, res) => {
    User.findAll({where : {'id': req.params.id}}).then((usuarios) => {
        res.render('admin/editUser', {usuarios: usuarios})
    }).catch((erro) => {
        res.send('erro ao entrar no menu de edição' + erro)
    })
})

router.get('/deletarUser/:id', (req, res) => {
    User.destroy({where: {'id': req.params.id}}).then(() => {
        res.render('admin/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

////////////////////////////////////////////////////////
// Quartos //
////////////////////////////////////////////////////////

router.get('/addRoom', (req, res) =>{
    res.render('admin/addRoom')
})

router.post('/poscadastroRoom', (req, res) => {

    var erros =  []

    if (!req.body.numberq || typeof req.body.numberq == undefined || req.body.numberq == null){
        erros.push({texto: 'invalid number'})
    }
    if (!req.body.diaria || typeof req.body.diaria == undefined || req.body.diaria == null){
        erros.push({texto: 'invalid Diary'})
    }
    if (!req.body.npessoas || typeof req.body.npessoas == undefined || req.body.npessoas == null){
        erros.push({texto: 'invalid number of people'})
    }
    


    if(erros.length > 0){
        res.render('admin/addRoom', {erros: erros})
    }else{

        Room.create({
            //referencia ao name="" do input do form
            numberq: req.body.numberq,
            diaria: req.body.diaria, 
            npessoas: req.body.npessoas,
            disponivel: req.body.disponivel
           
        }).then(() => {
            res.redirect('/admin/index')
        }).catch((erro) => {
            req.flash('error_msg', 'Um quarto com este número já existe')
            res.redirect('/admin/addRoom')
        })
    }

})

router.get('/quartos', (req, res) => {
    Room.findAll({order: [['numberq','ASC']]}).then((quartos) => {
        res.render('admin/quartos', {quartos: quartos})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar os quartos')
        res.redirect('/admin/index')
    })
})

router.get('/searchedRoom/:id', (req, res) => {
    Room.findAll({where: {'id': req.params.id}}).then((quartos) => {
        res.render('admin/searchedRoom', {quartos: quartos})
    }).catch((erro) => {
        res.send('Esse Usuário nao existe' + erro)
    })
})

router.post('/editRoom', (req, res) => {
    Room.update({
        numberq: req.body.numberq,
        diaria: req.body.diaria, 
        npessoas: req.body.npessoas,
        disponivel: req.body.disponivel,
        id: req.body.id

    },{where: {id: req.body.id}}).then(() => {
        res.flash('success_msg', "Usuário editado com sucesso")
        res.redirect('/quartos')
    }).catch((err) => {
        console.log(JSON.stringify(req.body))
        res.redirect('/admin/quartos')
    })
})

router.get('/editRoom/:id',(req, res) => {
    Room.findAll({where : {'id': req.params.id}}).then((quartos) => {
        res.render('admin/editRoom', {quartos: quartos})
    }).catch((erro) => {
        res.send('erro ao entrar no menu de edição' + erro)
    })
})

router.get('/deletarRoom/:numberq', (req, res) => {
    Room.destroy({where: {'numberq': req.params.numberq}}).then(() => {
        res.render('admin/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

router.post('/editRoom', (req, res) => {
    Room.update({
        numberq: req.body.numberq,
        diaria: req.body.diaria, 
        npessoas: req.body.npessoas,
        disponivel: req.body.disponivel,
        id: req.body.id

    },{where: {id: req.body.id}}).then(() => {
        res.flash('success_msg', "Usuário editado com sucesso")
        res.redirect('/quartos')
    }).catch((err) => {
        console.log(JSON.stringify(req.body))
        res.redirect('/admin/quartos')
    })
})

router.get('/liberar/:numberq', (req, res) => {
    Room.update({
        disponivel: true
    },{where: {'numberq': req.params.numberq}}).then(() => {
        res.render('admin/index')
    }).catch((erro) => {
        res.send('Essa postagem não existe' + erro)
    })
})

module.exports = router