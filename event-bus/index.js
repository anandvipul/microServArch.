const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  // Post Server
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err);
  });
  // Comment Server
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err);
  });
  // Query Server
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err);
  });

  // Moderation Service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const port = 4005;
app.listen(port, () => {
  console.log(`Event Manager is listening on http://localhost:${port}`);
});
