const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('weighbridge', 'root', 'sec382mSL', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./user')(sequelize);

module.exports = { sequelize, User };