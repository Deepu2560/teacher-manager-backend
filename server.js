const express = require("express");

const app = express();

// useing express middleware for getting data in json form
app.use(express.json());

// getting connect function form config/db
const connect = require("./src/Config/db");

// getting router from Controller files
const teacherController = require("./src/Controllers/teacher_controller");

const classController = require("./src/Controllers/classes_contoller");

const adminController = require("./src/Controllers/admin_controller");

const Class = require("./src/Models/class_model");

const Teacher = require("./src/Models/teacher_model");

const User = require("./src/Models/admin_model");

app.get("/", async (req, res) => {
  try {
    const teacher_data = await Teacher.find().lean().exec();
    const class_data = await Class.find().lean().exec();
    const user_data = await User.find().lean().exec();

    console.log("getting all documents of database");

    res
      .status(200)
      .send({ error: false, data: { teacher_data, class_data, user_data } });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).send({ error: true, data: "" });
  }
});

app.use("/teacher", teacherController);

app.use("/classes", classController);

app.use("/admin", adminController);

/* app.listen to start server on 8080 port */
app.listen(process.env.PORT || 8080, async () => {
  try {
    await connect();
    console.log("connected to server");
  } catch (error) {
    console.log("ERROR:", error);
  }
});
