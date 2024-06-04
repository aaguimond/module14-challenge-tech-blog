const { Comment } = require('../models');

// Seed comment data
const commentData = [
    {
        comment_text: 'This is a test comment for post 1.',
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: 'Thank you for your test comment, user 2.',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'This an example comment for post 3',
        user_id: 4,
        post_id: 3,
    },
];
// Send comment seed data to server
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;