/* import { Server } from "socket.io";

const configureWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
 

    socket.on("sendMail", (mail) => {
      io.emit("newMail", mail);
    });

    socket.on("disconnect", () => {
 
    });
  });
};

export default configureWebSocket; */