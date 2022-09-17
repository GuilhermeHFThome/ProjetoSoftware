const db = require('./db')
const Room = db.sequelize.define('quartos', {

    number: {
        type: db.Sequelize.INTEGER
    },
    ocupado: {
        type: db.Sequelize.BOOLEAN
    },
    limpo: {
        type: db.Sequelize.BOOLEAN
    }
  
    
})

//Room.sync({force: true})

module.exports = Room