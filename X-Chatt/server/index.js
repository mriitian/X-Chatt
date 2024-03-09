import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";
import chatRoute from "./Routes/chatRoutes.js";
import messageRoute from "./Routes/messageRoute.js";

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the chat world");
});

app.listen(port, (req, res) => {
  console.log("Server running on port", port);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Established"))
  .catch((e) => console.log("Connection Failed", e.message));
