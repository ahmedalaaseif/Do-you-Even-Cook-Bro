const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    index: {
      type: Number,
      required: true,
    },
    recipe: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      headline: {
        type: String,
        required: true,
      },
      prepTime: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      websiteURL: {
        type: String,
        required: true,
      },
      tags: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
      nutrition: {
        energy: {
          type: Number,
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
        carbohydrate: {
          type: Number,
          required: true,
        },
        protein: {
          type: Number,
          required: true,
        },
        fiber: {
          type: Number,
        },
        fat: {
          type: Number,
        },
        saturatedFat: {
          type: Number,
        },
        omega3: {
          type: Number,
        },
        vitaminD: {
          type: Number,
        },
        vitaminC: {
          type: Number,
        },
        calcium: {
          type: Number,
        },
        iron: {
          type: Number,
        },
      },
      ingredients: [
        {
          type: String,
          required: true,
        },
      ],
      instructions: [
        {
          type: String,
          required: true,
        },
      ],
    },
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  
  module.exports = Recipe;