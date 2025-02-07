/* import { Server } from "socket.io";

const configureWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMail", (mail) => {
      io.emit("newMail", mail);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default configureWebSocket; */