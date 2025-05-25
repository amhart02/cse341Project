const express = require('express')
const router = express.Router();

const recipeController = require('../controllers/recipes');

//use functions from recipe controller
router.get('/', recipeController.getAll);
router.get('/:id', recipeController.getSingle);
router.post('/', recipeController.createRecipe);
router.post('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;