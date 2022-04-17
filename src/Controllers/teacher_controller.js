const express = require("express");

const mongoose = require("mongoose");

const Teacher = require("../Models/teacher_model");

const Class = require("../Models/class_model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await Teacher.create(req.body);

    console.log("Teacher added");

    res.status(202).send({ error: false, teachers: user });
  } catch (error) {
    console.log("ERROR:", error);
    res.send(500).send({ error: true, teachers: "" });
  }
});

router.get("", async (req, res) => {
  try {
    const user = await Teacher.find().lean().exec();

    console.log("Showing all documents of teacher");

    res.status(200).send({ error: false, teachers: user });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send({ error: true, teachers: "" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Teacher.findByIdAndDelete(req.params.id).lean().exec();
    const user_class = await Class.deleteMany({ teacher_id: req.params.id })
      .lean()
      .exec();

    console.log(`${req.params.id} teacher deleted`);

    res.status(200).send({ error: false, teachers: "Delete" });
  } catch (error) {
    console.log();
    res.status(500).send({ error: true, teachers: "" });
  }
});

module.exports = router;
