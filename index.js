const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

//Import Routes
const authRoute = require("./routes/auth");
const musicRoute = require("./routes/music");
const profileRoute = require("./routes/profile");
const config = require("./config/config");
dotenv.config();

//Connect to db
mongoose.connect(
  config.dbConnect,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);
//Body parser middlleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/music", musicRoute);
app.use("/api/profile", profileRoute);

//SERVER static assets if in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running ${port}`));
