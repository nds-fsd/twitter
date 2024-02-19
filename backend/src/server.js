const { createApp } = require("./index");

const startServer = () => {
  const app = createApp();

  const port = process.env.PORT || 3001;
  const server = app.listen(port, () => {
    console.log(`Express server is up and running at ${port}`);
  });

  const io = app.get("io");

  io.attach(server);

  const webSocketPort = process.env.WS_PORT || 3010;
  console.log(`WebSocket server is up and running at ${webSocketPort}`);
};

startServer();
