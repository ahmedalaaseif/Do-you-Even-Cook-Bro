const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  meals: [{ type: String }],
});

const User = mongoose.model("Meal", mealSchema);

module.exports = User;
