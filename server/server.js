const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "asfbrhrbffrr3be5yrf";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", //host of our react app
  })
); //for using different servers for app and server
app.use(express.json()); //for parsing the json data
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //first find the doc using username
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    res.send(400).json({ msg: "Wrong credentials" });
    return;
  }
  //now compare the password
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on the PORT ${PORT}`);
});
