const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on the PORT ${PORT}`);
});
