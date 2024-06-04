const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const hbs = exphbs.create({});

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