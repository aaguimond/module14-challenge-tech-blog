const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');
// Seed data
const seedAll = async () => {
    // Sync database, create tables
    await sequelize.sync({ force: true });
    console.log('Database synced.');
    // Seed users
    await seedUsers();
    console.log('Users seeded.');
    // Seed posts
    await seedPosts();
    console.log('Posts seeded.');
    // Seed comments
    await seedComments();
    console.log('Comments seeded.');
    // Exit process if no errors are encountered
    process.exit(0);
};

seedAll();