const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res, next) => {
  console.log('Swagger docs route hit');
  next();
});

router.use('/', swaggerUi.serve);
// router.get('/', swaggerUi.setup(swaggerDocument));
router.get(
  '/',
  swaggerUi.setup(swaggerDocument, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    swaggerOptions: {
      url: '/swagger.json', // optional if your swaggerDocument is already loaded
    },
  })
);

module.exports = router;