// Dependencies 
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require("express-session");
const routes = require('./controllers');
const helpers = require("./utils/helpers");
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Initialize handlebars
const hbs = exphbs.create({ helpers });

// Initialize sessions
const sess = {
    secret: 'secreto',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

// Initialize server 
const app = express();
const PORT = process.env.PORT || 3001;

// Handling incoming data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Inform Express.js on which template to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(routes);

// Set listener adn connect db and s
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => { console.log(`Now listening on ${PORT}!`);});
});
