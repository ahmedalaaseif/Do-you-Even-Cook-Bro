// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();
const recipeController = require("./controllers/recipeController");
const { chatGPTCall } = require("./controllers/gptController");
const userController = require("./controllers/userController");
const User = require("./schemas/User");
const helper = require("./controllers/helpers");
const cors = require("cors");
const bodyParser = require("body-parser");

const defaultMeals = require("./mealsalaa.json");
const defaultUser = require("./alaa.json");

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes using the controller
app.get("/recipes/:index", recipeController.getRecipeByIndex);
app.get("/recipes/name/:name", recipeController.getRecipeByName);
app.get("/recipes", recipeController.getAllRecipes);
// Routes using the user controller

app.get("/users/:name", userController.getUserByName);
app.get("/users", userController.getAllUsers);
app.get("/test", async (req, res) => {
  const str = "Hello";
  const out = helper.parseMealText(
    "nformation: Below is the suggested user meals and the reason for them meals:\nGreen Smoothie Bowl with Chia Seeds: because Chia seed is so good for health,\nMediterranean Quinoa Salad with Grilled Chicken: High protein"
  );
  console.log(out);
  res.json(out);
});
app.put("/users/:name", userController.updateUserByName);

app.get("/recommendMeals/:name", async (req, res) => {
  try {
    const user = await userController.getUserByNameFunction(req.params.name);
    const recipes = await recipeController.getAllRecipesFunctions();
    const response = await chatGPTCall(
      user.name,
      `Given this user data \n ${user}\n recommend the possible meals to eat\
    you should try to use meals that need similar components to reduce waste ${recipes} \n the output should be text ONLY.\
    The OUTPUT contains the following information;meal1;meal2;and so on. each meal contains meal as mealname,why is it beneficial for this user\
    follow this sample output below. any thing that you need to write put it in the information key.\
    information: Below is the suggested user meals and the reason for them
  meals:
    Green Smoothie Bowl with Chia Seeds: because Chia seed is so good for health,
    Mediterranean Quinoa Salad with Grilled Chicken: High protein,
    ...
  `
    );
    console.log(response.choices[0].message.content);
    let modifiedString = helper.parseMealText(
      response.choices[0].message.content
    );
    console.log(modifiedString);
    res.json(modifiedString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.json(defaultMeals);
  }
});
app.get("/recommend/:name", async (req, res) => {
  try {
    const user = await userController.getUserByNameFunction(req.params.name);
    const recipes = await recipeController.getAllRecipesFunctions();
    const response = await chatGPTCall(
      user.name,
      `Given this user data \n ${user}\n recommend a 3 day dietary plan using these meals,\
  you should try to use meals that need similar components to reduce waste ${recipes} \n the output should be text ONLY.\
  The OUTPUT contains the following information;Day1;Day2;Day3. each day contains the 3 meal names as meal1,meal2,meal3\
  follow this sample output below. any thing that you need to write put it in the information key.\
  information: Below is a 3-day dietary plan based on the given user data and meal options. The plan considers the dietary preferences and nutritional information provided;  as well as the efforts to use meals with similar components to reduce waste. The breakfast 'Green Smoothie Bowl with Chia Seeds' is repeated each day to provide a consistent and nutritious start to the day.  Quinoa is a recurring ingredient in many of the selected meals, which aligns with the goal of reducing waste.  A variety of vegetables and protein sources are included to ensure a balanced diet. Since the user has a preference for Asian cuisine and an advanced difficulty level;  meals were chosen to cater to those preferences without directly reflecting them in each day's plan.
- The user's dietary preference is vegetarian, but not vegan;  which allows for the inclusion of meals with dairy and eggs. All meals selected fall within the cooking time preference marked as 'quick'
meals:
  Breakfast: Green Smoothie Bowl with Chia Seeds,
  Lunch: Mediterranean Quinoa Salad with Grilled Chicken,
  Dinner: Lean Turkey and Quinoa Stuffed Peppers;

  Breakfast: ...,
  Lunch: ...,
  Dinner: ...;

  Breakfast: ...,
  Lunch: ...,
  Dinner: ...;
`
    );
    let modifiedString = helper.helpMeParse(
      response.choices[0].message.content
    );
    // console.log(modifiedString);
    res.json(modifiedString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.json(defaultUser);
  }
});

// Function to get all routes
function getAllRoutes() {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        method: Object.keys(middleware.route.methods)[0],
      });
    } else if (middleware.name === "router") {
      // Routes added as middleware (e.g., using app.use('/api', apiRouter))
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: `${middleware.regexp.source}${handler.route.path}`,
            method: Object.keys(handler.route.methods)[0],
          });
        }
      });
    }
  });
  return routes;
}

// Route to get all routes
app.get("/explore", (req, res) => {
  const allRoutes = getAllRoutes();
  res.json(allRoutes);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
