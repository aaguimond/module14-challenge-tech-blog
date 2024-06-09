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
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        // Maps all posts to plain json
        const posts = postData.map((post) => post.get({ plain: true }));
        // Render posts IF user is logged in
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
            loggedInUser: req.session.user_id ? { id: req.session.user_id } : null,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
            loggedInUser: req.session.user_id ? { id: req.session.user_id } : null,
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

router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('register');
});

module.exports = router;