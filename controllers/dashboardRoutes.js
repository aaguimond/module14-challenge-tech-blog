const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
    console.log('Dashboard route hit =================================================')
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
router.get('/new-post', withAuth, (req, res) => {
    console.log('New post route hit =================================================')
    res.render('new-post', {
        loggedIn: req.session.loggedIn,
    });
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
    console.log('Edit post route hit =================================================')
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(400).json({ message: 'No post found with this ID.' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;