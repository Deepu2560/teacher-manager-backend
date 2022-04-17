const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const newAdminschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

newAdminschema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

newAdminschema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("admin", newAdminschema);
