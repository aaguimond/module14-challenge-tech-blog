const { Post } = require('../models');

// Post seed data
const postData = [
    {
        title: 'Post 1',
        content: 'Example content for test post 1.',
        user_id: 1,
    },
    {
        title: 'Example Post 2',
        content: 'This is another example post with example content for test post 2.',
        user_id: 2,
    },
    {
        title: 'Third Test Post',
        content: 'Different example text to vary site appearance.',
        user_id: 1,
    },
];
// Sending over our post seed data in bulk
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;