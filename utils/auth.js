// Defining withAuth requirements
const withAuth = (req, res, next) => {
    // If the user doesn't have a loggedIn session,
    if (!req.session.loggedIn) {
        // redirect them to the login page
        res.redirect('/login');
    // If they are logged in,
    } else {
        // Move on to the next task
        next();
    }
};

module.exports = withAuth;