const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config;
require("dotenv").config({ debug: true });

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

https: app.get("/", (req, res) => {
  console.log("Hii");
  res.send("Hii");
});

// route for API call
app.get("/:q", async (req, res) => {
  // q is the query(request) recieved from the frontend when the user types the text
  const text = req.params.q;
  const payload = {
    contents: [
      {
        parts: [
          {
            text: text,
          },
        ],
      },
    ],
  };

  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json(); // response to the query from the API
  // console.log(data);
  res.send(data);
});

app.listen(5000, () => {
  console.log("server is running");
});
