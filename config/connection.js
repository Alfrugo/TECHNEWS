const Sequielize = require('sequelize');
require('dotenv').config();


//create connection to the db
const sequelize = new Sequielize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306;
})

module.exports = sequelize;