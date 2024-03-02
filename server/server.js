const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); //for using different servers for app and server
app.use(express.json());  //for parsing the json data

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/register", (req, res) => {
  const {username,password}=req.body;
  res.json({requestData:{username,password}});
});

PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on the PORT ${PORT}`);
});

// mongodb+srv://rajaayush248:UBoCUbXhtVvHDrPq@cluster0.5uphepe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// UBoCUbXhtVvHDrPq