const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors("*"));

const events = [];

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  const event = req.body;

  events.push(event);

  //posts
  axios.post("http://localhost:8000/events", event).catch((err) => {
    console.log(err.message);
  });
  //comments
  axios.post("http://localhost:8001/events", event).catch((err) => {
    console.log(err.message);
  });
  //query service
  axios.post("http://localhost:8002/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:8003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const port = process.env.PORT || 8005;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
