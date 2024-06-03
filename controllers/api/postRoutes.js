const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            // Spread function to concatenate the req body and the user id into a new post object
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Updates a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        // Defines post using the post ID from the request and user ID from the session
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If there's not an updatedPost, return error
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }
        // If successful, respond with the updated post
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deletes a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Get post ID from request and user ID from session
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If not deletedPost found, return error
        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }
        // If successful, return json of deletedPost
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;