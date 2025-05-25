const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Recipe API',
        description: "Recipe API"
    },
    host: 'cse341project-34u3.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js');
// });