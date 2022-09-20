const db = require('./db')
const Client = db.sequelize.define('clientes', {

    name: {
        type: db.Sequelize.STRING
    },
    lastName: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    number: {
        type: db.Sequelize.STRING
    },
    
})

//Client.sync({force: true})

module.exports = Client

const User = db.sequelize.define('usuarios', {
    name: {
        type: db.Sequelize.STRING
    },
    lastName: {
        type: db.Sequelize.STRING
    },
    login: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
})

//User.sync({force: true})

module.exports = User