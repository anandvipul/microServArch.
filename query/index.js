const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, status, content, postId } = data;
    const post = posts[postId];
    // console.log(postId);
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("The Query Server is up and Running on port 4002");

  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      console.log("Processing Event: ", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.log);
  }
});
