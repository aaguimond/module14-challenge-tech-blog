const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

// Inheriting the Model class's framework from sequelize
class Post extends Model {}

// Defining the Post model attributes
Post.init(
    {
        // Each post must have a unique ID
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        // Passing sequelize instance, not including timestamps, not pluralizing table name,
        // not allowing spaces in attributes, and defining the model name
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;