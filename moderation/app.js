const express = require("express");

const app = express();
const axios = require("axios");

app.use(express.json());

const handleEvent = async (type, data) => {
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:8005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

const port = process.env.PORT || 8003;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  const res = await axios.get("http://localhost:8005/events");

  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
