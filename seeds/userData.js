const bcrypt = require('bcrypt');
const { User } = require('../models');

// Seed user data
const userData = [
    {
        username: 'user1',
        email: '1user1@example.com',
        password: 'examplepassword123',
    },
    {
        username: 'TestUser2',
        email: '2user2@example.com',
        password: 'examplepassword123',
    },
    {
        username: '3rdUser',
        email: '3user3@example.com',
        password: 'examplepassword123',
    },
    {
        username: 'Test4User',
        email: '4user4@example.com',
        password: 'examplepassword123',
    },
    {
        username: '5User5Test5',
        email: '5user5@example.com',
        password: 'examplepassword123',
    },
];
// Send all user data to the database with encrypting of the passwords before storing in the database
const seedUsers = async () => {
    for (const user of userData) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    await User.bulkCreate(userData);
}

module.exports = seedUsers;