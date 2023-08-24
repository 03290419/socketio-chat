const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(8011, function () {
  console.log(`SocketIO server http://localhost:${8011}`);
});
