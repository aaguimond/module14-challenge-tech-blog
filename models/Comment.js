const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

// Inheriting the Model class's framework from sequelize
class Comment extends Model {}

// Defining the Post model attributes
Comment.init(
    {
        // Each post must have a unique ID
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
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
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
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
        modelName: 'comment',
    }
);

module.exports = Comment;