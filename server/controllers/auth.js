const User = require("../models/user");
const moment = require('moment');

exports.createOrUpdateUser = async (req, res) => {
  console.log(req)
  const { name, picture, email } = req.user;//comes default from google

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);

    res.json(user);
  });
};
