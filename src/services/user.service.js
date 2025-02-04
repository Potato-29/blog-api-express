const User = require("../models/userModel");

module.exports = {
  getUser: async (id) => {
    const user = await User.findOne({ _id: id });
    return user;
  },
  getUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  registerUser: async (payload) => {
    const user = new User(payload);
    await user.save();
    return user;
  },
};
