import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timeStamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
