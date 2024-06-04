const sequelize = require('../config/connection');
const { User } = require('../models');

// Seed user data
const userData = [
    {
        email: '1user1@example.com',
        password: 'examplepassword123',
    },
    {
        email: '2user2@example.com',
        password: 'examplepassword123',
    },
    {
        email: '3user3@example.com',
        password: 'examplepassword123',
    },
    {
        email: '4user4@example.com',
        password: 'examplepassword123',
    },
    {
        email: '5user5@example.com',
        password: 'examplepassword123',
    },
];
// Send all user data to the database, with the hooks in the user model included
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;