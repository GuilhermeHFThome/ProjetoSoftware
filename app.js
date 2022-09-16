// Carregando modulos
    const express = require('express');
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser');
    const app = express()
    const admin = require('./routes/admin') // dizendo pro express que as rotas do arquivo admin existem
    const receptionist = require('./routes/receptionist')
    const path = require('path')// trabalhar com diretorios
    const session = require('express-session')
    const flash = require('connect-flash')
    const Client = require('./models/Cadastro');


// Configuração
    //sessao
        app.use(session({
            secret: 'cursodenode',
            resave:true,
            saveUninitialized: true

        }))
        app.use(flash())
    //Middleware

        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg') // variaveis globais
            res.locals.error_msg = req.flash('error_msg')
            next()
        })

    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
        app.set('view engine', 'handlebars')
        
    // Public
        app.use(express.static(path.join(__dirname, 'public'))) //falando q é a pasta public que guarda todos os arquivos estaticos

        app.use ((req, res, next) => {
            console.log('middleware funcionando')
            next()
        })

// Rotas
    app.get('/', (req, res) => {
        res.render('login')
    })

    app.use('/admin', admin)
    app.use('/receptionist', receptionist)

    



// Outros
    const PORT = 8081
    app.listen(PORT, () =>{
        console.log('Servidor rodando')
    })