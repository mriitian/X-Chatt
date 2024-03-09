import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const chatSchema = mongoose.Schema(
  {
    members: Array,
  },
  {
    timeStamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);

router.post("/", async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      res.status(200).json(chat);
    }

    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/find/:firstId/:secondId", async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
