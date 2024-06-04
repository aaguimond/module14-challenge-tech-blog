const router = require('express').Router();
const { User } = require('../../models');

// Creates a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // Logs new user in after creation
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Logs user in
router.post('/login', async (req, res) => {
    try {
        // Finds user in database from email
        const userData = await User.findOne({ where: { email: req.body.email } });
        // If no userdata is found, return error message and stop
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }
        // Checks user's entered password after encrypted against encrypted password in db
        const validPassword = userData.checkPassword(req.body.password);
        // If pw is not valid, return error and stop
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }
        // If login is successful, save the session and loggedIn attribute
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You have successfully logged in.' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Logs out the user
router.post('/logout', (req, res) => {
    // If the user's session is logged in, then we delete the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;