function parseMealText(text) {
  const lines = text.split("\n");
  let result = { meals: {} };
  let currentMeal;

  for (const line of lines) {
    if (line.includes("information")) {
      result["information"] = line.split(":")[1].trim();
    } else if (line.includes("meals")) {
      // Initialize the 'meals' object
      result["meals"] = {};
    } else if (line.trim() !== "") {
      // Split the line into meal name and reason
      const [mealName, reason] = line.split(":").map((item) => item.trim());

      // Assign the reason to the respective meal name
      result["meals"][mealName] = reason;
      currentMeal = mealName;
    }
  }

  return result;
}

function helpMeParse(inputText) {
  // Split the text into lines
  const lines = inputText.split("\n");

  // Initialize variables
  let result = {};
  let currentDay;

  // Iterate through each line
  for (const line of lines) {
    // Check if the line contains 'information' or 'meals'
    if (line.includes("information")) {
      // Assign the information to the 'information' key
      result["information"] = line.split(":")[1].trim();
    } else if (line.includes("meals")) {
      // Initialize the 'meals' object
      result["meals"] = {};
    } else if (line.startsWith("Day")) {
      // Extract the day from the line
      currentDay = line.split(":")[0].trim();
      // Initialize the day's object in 'meals'
      result["meals"][currentDay] = {};
    } else if (
      line.includes("Breakfast") ||
      line.includes("Lunch") ||
      line.includes("Dinner")
    ) {
      // Extract meal type and content
      const [mealType, mealContent] = [
        line.split(":")[0].split(",")[0].trim(),
        line.split(":")[1].split(",")[0].trim().replace(/;/g, ''),
      ];
      console.log(mealType,mealContent);
      // Assign the meal content to the respective meal type under the current day
      result["meals"][currentDay][mealType] = mealContent;
    }
  }
  return result;
}

// Export the function to make it available in other modules
module.exports = { parseMealText, helpMeParse };
