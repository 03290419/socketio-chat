const app = require("express")();
const server = require("http").createServer(app);
// http server를 socket.io server 로 업그레이드
const io = require("socket.io")(server);

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

// connection event Handler
// connection 이벤트가 수립되면 event handler function의 인자로 socket이 들어온다.
io.on("connect", (socket) => {
  // 접속한 클라이언트의 정보가 수신되면
  socket.on("login", (data) => {
    console.log(`Client logged-in:
        name: ${data.name}
        userid: ${data.userid}
        `);

    //socket에 클라이언트 정보를 저장한다.
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다.
    io.emit("login", data.name);
  });

  //   클라이언트로부터의 메시지가 수신되면
  socket.on("chat", (data) => {
    console.log(`Message from %s: %s`, socket.name, data.msg);
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다.
    socket.broadcast.emit("chat", msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다.
    // socket.emit('s2c chat', msg)

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    // io.emit('s2c chat', msg)

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data)
  });

  //   force client disconnect from server
  socket.on("forceDisconnect", () => {
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.name}`);
  });
});

server.listen(8011, function () {
  console.log(`SocketIO server http://localhost:${8011}`);
});
