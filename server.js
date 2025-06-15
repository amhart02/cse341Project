//set variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'jqndSPg7Wt6FtPne1TujZwtFVEQN7fZj',
    issuerBaseURL: 'https://dev-nu62k4byqy0illpg.us.auth0.com'
};

//global routes
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use("/", require('./routes'));
app.use(express.static('.'))



// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//initalize database
mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
        process.exit(1)
    } else {
        app.listen(port);
        console.log('Connected to DB')
    }
})