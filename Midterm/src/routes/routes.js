const express = require('express');
const router = express.Router();
const Recipe = require('../model/recipe');
const controller = require('../controllers/controller.js');
const middleware = require('../middleware/middleware.js');



router.get('/', middleware.logReadRequest, controller.getAllRecipe);
router.get('/:id', middleware.logFindRequest, controller.findRecipe);
router.get('/recipes',middleware.logReadRequest, controller.getAllRecipe);
router.get('/ingredients', middleware.logNewRequest, controller.getAllIngredients);
router.get('/recipes/cuisine/:cuisine', controller.getRecipiesByCuisine);
router.get('/ingredients/:ingredientName', controller.getIngredientName);

module.exports = router;
