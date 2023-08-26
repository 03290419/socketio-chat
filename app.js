const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

// namespace chat 에 접속한다.
var chat = io.of("/chat").on("connection", (socket) => {
  socket.on("chat message", (data) => {
    console.log("message from client: ", data);

    const name = ({ socket } = data.name);
    const room = ({ socket } = data.room);

    // const name = (socket.name = data.name);
    // const room = (socket.room = data.room);

    // room에 join 되어 있는 클라이언트에게 메시지를 전송한다.
    chat.to(room).emit("chat message", data.msg);
  });
});

server.listen(8011, function () {
  console.log(`SocketIO server http://localhost:${8011}`);
});
