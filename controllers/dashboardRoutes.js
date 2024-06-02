const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
    try {
        // Gets all posts made by the user
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        // Translates the post data into plain json
        const posts = postData.map((post) => post.get({ plain: true }));
        // Renders posts to dashboard IF user is logged in
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Renders new post page
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn,
    });
});

module.exports = router;