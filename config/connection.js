const Sequelize = require('sequelize');
require('dotenv').config();

// Initializing a new sequelize instance with the following attributes.
// Postgres is hard coded as the username to reduce errors
const sequelize = new Sequelize(
    process.env.DB_NAME,
    'postgres',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
);

module.exports = sequelize;