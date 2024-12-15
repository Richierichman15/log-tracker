const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('driver_payments', 'postgres', null, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false 
});

module.exports = sequelize;
