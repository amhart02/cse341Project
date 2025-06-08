const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/recipes', require('./recipes'));
routes.use('/users', require('./user'));
// routes.use('/user', require('./user')); implement later
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;