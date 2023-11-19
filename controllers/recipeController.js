// recipeController.js
const Recipe = require('../schemas/Recipe'); // Replace with the actual path to your model file

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const recipeDictionary = {};

  recipes.forEach(recipeObj => {
    const recipeName = recipeObj.recipe.name;
    recipeDictionary[recipeName] = recipeObj.recipe;
  });
    res.json(recipeDictionary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRecipesFunctions = async () => {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    return {Error:"Recipes not found"}
  }
};

const getRecipeByIndex = async (req, res) => {
  try {
    const { index } = req.params;
    const recipe = await Recipe.findOne({ 'index': index });
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const recipe = await Recipe.findOne({ 'recipe.name': name });
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllRecipes,
  getRecipeByIndex,
  getRecipeByName,
  getAllRecipesFunctions,
};
