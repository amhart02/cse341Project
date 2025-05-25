//set variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;

//global routes
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})
app.use("/", require('./routes'));
app.use(express.static('.'))

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
