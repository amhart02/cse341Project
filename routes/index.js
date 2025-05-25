const routes = require('express').Router();

routes.use('/recipes', require('./recipes'));
// routes.use('/user', require('./user')); implement later

module.exports = routes;