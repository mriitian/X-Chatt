import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:5173" });
let onlineUser = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({ userId, socketId: socket.id });
    console.log("onlineUser", onlineUser);

    io.emit("getOnlineUsers", onlineUser);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUser.find((user) => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUser);
  });
});

io.listen(5000);
