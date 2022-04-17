const mongoose = require("mongoose");

// connect function for building connection with cloud database
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Deepu2560:teacher@cluster0.5jaog.mongodb.net/deepanshu?retryWrites=true&w=majority",
  );
};

module.exports = connect;
