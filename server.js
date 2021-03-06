const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

connectDB(); //Connect to Database

//Initialize Middlewares
app.use(express.json({ extended: false })); //Using Express's bodyparser instead of app.use(bodyParser.json({extended:false}))

app.use(cors()); // Use Cross Origin Resource Sharing to allow the front end to connect with this backend

// app.get("/", (req, res) => {
//   res.send("Backend Running");
// });

//Define Routes

app.use("/api/users", require("./routes/api/users")); // the route /api/users will be pertained to the "/" present in the file users.js
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
