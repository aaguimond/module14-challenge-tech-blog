const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            // Spread function to concatenate the req body and the user id into a new post object
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Deletes a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Get comment ID from request and user ID from session
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If not deletedComment found, return error
        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this ID.' });
            return;
        }
        // If successful, return json of deletedComment
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;