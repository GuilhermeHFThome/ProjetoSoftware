const db = require('./db')
const Client = db.sequelize.define('clientes', {

    name: {
        type: db.Sequelize.STRING
    },
    lastName: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    number: {
        type: db.Sequelize.INTEGER
    },
    checkin: {
        type: db.Sequelize.DATEONLY
    },
    checkout: {
        type: db.Sequelize.DATEONLY
    },
    nquarto:{
        type: db.Sequelize.INTEGER
    }
})

Client.associate = function(models) {
    Client.hasOne(models.Room);
  }

//Client.sync({force: true})

module.exports = Client

