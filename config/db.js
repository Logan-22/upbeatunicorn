const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // To get the connections string from default.json

const connectDB = async () => {
  //Typically Async functions contains Try and catch blocks of code.
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }); //Returns a Promise , hence await
    console.log("MongoDb Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB; //Exports the connectDB function
