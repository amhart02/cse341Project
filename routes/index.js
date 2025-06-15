const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');

routes.use('/recipes', require('./recipes'));
routes.use('/users', require('./user'));
// routes.use('/user', require('./user')); implement later
routes.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        oauth: {
            clientId: process.env.CLIENT_ID,
            scopes: 'read write',
            usePkceWithAuthorizationCodeGrant: true
        },
        oauth2RedirectUrl: 'https://cse341project-34u3.onrender.com/api-docs/oauth2-redirect.html',
        autoAuthorize: false
    }
}));

module.exports = routes;