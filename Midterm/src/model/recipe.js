const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeId: Number,
    title: String,
    ingredients:  [String],
    instructions: String,
    prepTime: Number,
    cookTime: Number,
    cuisine: String
})
const Recipe = mongoose.model('Recipes', recipeSchema);

module.exports = Recipe;