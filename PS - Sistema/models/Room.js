const Client = require('./Cadastro')
const db = require('./db')
const Room = db.sequelize.define('quartos', {

    numberq: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        
    },    
    diaria: {
        type: db.Sequelize.INTEGER
    },
    npessoas: {
        type: db.Sequelize.STRING
    },
    disponivel: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

Room.associate = function(models) {
    Room.belongsTo(models.Client, {
      foreignKey:{
        allowNull: false
      }
    });
  }

//Room.sync({force: true})

module.exports = Room