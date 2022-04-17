const express = require("express");

const Class = require("../Models/class_model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await Class.create(req.body);

    console.log("Class added");

    res.status(202).send({ error: false, classesdata: user });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send({ error: true, classesdata: user });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Class.find({ teacher_id: req.params.id }).lean().exec();

    console.log("Getting all documents of Classes");

    res.status(200).send({ error: false, classesdata: user });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send({ error: true, classesdata: user });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Class.findByIdAndDelete(req.params.id).lean().exec();

    console.log(`${req.params.id} Class Delete`);

    res.status(200).send({ error: false, classesdata: "Delete" });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send({ error: true, classesdata: user });
  }
});

module.exports = router;
