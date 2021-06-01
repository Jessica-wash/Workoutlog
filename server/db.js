const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Masterpassword@localhost:5432/workoutLog");

module.exports = sequelize;