const Sequelize = require('sequelize');

const sequelize = new Sequelize('hotel', 'root', 'Gamora02*', {
    host: 'localhost',
    dialect:'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}