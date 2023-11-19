const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  weight: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  BMI: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  bodyFat: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  fatFreeBodyWeight: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  subcutaneousFat: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  visceralFat: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  bodyWater: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  skeletalMuscle: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  muscleMass: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  boneMass: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  protein: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  BMR: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  metabolicAge: {
    value: { type: Number },
    unit: { type: String },
    level: { type: Number }
  },
  dietaryPreferences: {
    vegetarian: { type: Boolean },
    vegan: { type: Boolean },
    pescatarian: { type: Boolean },
    glutenFree: { type: Boolean }
  },
  allergenFilters: {
    nutFree: { type: Boolean },
    dairyFree: { type: Boolean },
    eggFree: { type: Boolean }
  },
  cuisineType: {
    italian: { type: Boolean },
    mexican: { type: Boolean },
    asian: { type: Boolean }
  },
  difficultyLevel: {
    easy: { type: Boolean },
    intermediate: { type: Boolean },
    advanced: { type: Boolean }
  },
  specificIngredients: { type: [String], default: [] },
  cookingTime: {
    quick: { type: Boolean },
    moderate: { type: Boolean },
    long: { type: Boolean }
  },
  inSeasonProduce: { type: Boolean }
});

const User = mongoose.model('User', userSchema);

module.exports = User;