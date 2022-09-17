const Sequelize = require('sequelize');

const sequelize = new Sequelize('hotel', 'root', 'G123456789', {
    host: 'localhost',
    dialect:'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}