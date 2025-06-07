const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const isValidObject = (id) => ObjectId.isValid(id) && String(new ObjectId(id)) === id;

