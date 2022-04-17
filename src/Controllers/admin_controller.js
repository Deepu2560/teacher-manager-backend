const express = require("express");

const User = require("../Models/admin_model");

const router = express.Router();

const { register, login } = require("./auth_controller");

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    console.log("Showing all data");
    res.status(200).send(user);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
});

router.post("/register", register);

router.post("/login", login);

module.exports = router;
