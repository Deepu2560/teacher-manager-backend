const mongoose = require("mongoose");

const classschema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: true,
    },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    day: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("class", classschema);
