const Sequelize = require('sequelize');

const sequelize = new Sequelize('hotel', 'root', 'abc123', {
    host: 'localhost',
    dialect:'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}