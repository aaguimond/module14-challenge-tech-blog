const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
    try {
        // Gets all posts and includes the username of the authors
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        // Maps all posts to plain json
        const posts = postData.map((post) => post.get({ plain: true }));
        // Render posts IF user is logged in
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login routes
router.get('/login', (req, res) => {
    // Reroute to homepage if logged in user tries to go to login page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;