const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Recipe API',
        description: "Recipe API"
    },
    host: 'cse341project-34u3.onrender.com',
    schemes: ['https'],
    securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      authorizationUrl: 'https://dev-nu62k4byqy0illpg.us.auth0.com/authorize',
      tokenUrl: 'https://dev-nu62k4byqy0illpg.us.auth0.com/oauth/token',
      flow: 'accessCode',
      scopes: {
        read: 'Read access to recipes',
        write: 'Write access to recipes'
      }
    }
  },
  security: [
    {
      OAuth2: ['read', 'write']
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
