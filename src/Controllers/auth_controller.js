require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../Models/admin_model");

const newToken = (user) => {
  return jwt.sign({ user }, `${process.env.JWT__KEY}`);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username })
      .lean()
      .exec();

    if (user) return res.status(400).send({ error: true, token: "" });

    user = await User.create(req.body);

    const token = newToken(user);

    console.log(`${req.body.name} is registered. token: ${token}`);

    res.send({ error: false, token });
  } catch (err) {
    res.status(500).send({ error: true, token: "" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      console.log("Please check your username or password");
      return res.status(400).send({ error: true, token: "" });
    }

    let match = user.checkPassword(req.body.password);

    if (!match) {
      console.log("Please check your username or password");
      return res.status(400).send({ error: true, token: "" });
    }

    const token = newToken(user);

    console.log(`${user.name} is logged in`);

    res.status(200).send({ error: false, token });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send({ error: true, token: "" });
  }
};

module.exports = { register, login };
