const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
// Import model logic
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Defining relationships between models
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Export models and sequelize instance
module.exports = {
    User,
    Post,
    Comment,
    sequelize,
};