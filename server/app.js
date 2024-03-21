const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ debug: true });
const RoutesAPI = require("./routes/routesAPI");

app.use(express.json());
app.use(cors());
app.use("/", RoutesAPI);

app.get("/", (req, res) => {
  console.log("Hii");
  res.send("Hii");
});

app.listen(5000, () => {
  console.log("server is running");
});
