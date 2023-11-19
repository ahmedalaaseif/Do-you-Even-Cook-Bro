const User = require("../schemas/User");

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByNameFunction = async (name) => {
  try {
    const user = await User.findOne({ name });
    return user;
  } catch (error) {
    return {Error: "User Not Found"};
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUserByName = async (req, res) => {
    try {
      const { name } = req.params;
  
      // Assuming you have a User model with a schema that matches your data structure
      const user = await User.findOne({ name });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user with all fields from req.body
      Object.assign(user, req.body);
      // Save the updated user
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = { getUserByName, getAllUsers, getUserByNameFunction, updateUserByName };
