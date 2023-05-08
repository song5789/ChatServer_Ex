let http = require("http");
let fs = require("fs");
let socketio = require("socket.io");

let server = http
  .createServer((requset, response) => {
    fs.readFile("chatting.html", (error, data) => {
      response.writeHead(200, { "Content-type": "text/html" });
      response.end(data);
    });
  })
  .listen(8888, () => {
    console.log("포트 8888 에서 서버 정상 구동");
  });

let io = socketio.listen(server);

io.sockets.on("connection", (socket) => {
  socket.on("send", (data) => {
    io.sockets.emit("echo", data);
  });
});
