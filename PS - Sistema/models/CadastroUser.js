const db = require('./db')
const User = db.sequelize.define('usuarios', {
    nameU: {
        type: db.Sequelize.STRING
    },
    lastNameU: {
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