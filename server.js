const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const dayjs = require('dayjs');
const hbs = exphbs.create({
    // Custom helper function
    helpers: {
        // Used in post.handlebars to conditionally show delete button if the user that authored the comment is logged in
        ifCond: function (v1, v2, options) {
            // v1 = user_id, and v2 = loggedInUser.id, so if the user_id of the comment equals the loggedInUser.id,
            if (v1 === v2) {
                // the custom helper code block in the post.handlebars is rendered
                return options.fn(this);
            }
            // If not, nothing is rendered
            return options.inverse(this);
        },
        formatDate: function (date) {
            return dayjs(date).format('MMMM D, YYYY h:mm A');
        }
    }
});

const app = express();
const PORT = process.env.PORT || 3000;

// Defining session attributes: string to verify, cookie defaults, no resave, new instance of SeqStore and saved to db
const sess = {
    secret: 'example123',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
// Initialize session middleware
app.use(session(sess));
// Define handlebars as engine for views
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Middleware to parse json data and urlencoded data, and allow access to files in public/ folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Linking routes
app.use(routes);
// Sync sequelize with db, prevent existing db data from being dropped
sequelize.sync({ force: false }).then(() => {
    // Initialize server and state that it's listening
    app.listen(PORT, () => console.log(`Now listening to server at ${PORT}`));
});