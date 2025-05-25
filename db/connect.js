//import variables
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

//initialize database
const initDB = (callback) => {
    // if the database is already initialized
    if (_db) {
        console.log('DB is already initialized')
        return callback(null, _db)
    }
    //connect the database using the URI
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        _db = client.db('CSE341Project');
        callback(null, _db);
    })
}

//ensure database is connected
const getDB = () => {
    if (!_db) {
        throw error('DB is not initialized');
    }
    return _db;
}

//export functions 
module.exports = { initDB, getDB };