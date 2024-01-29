const {createApp} = require('./index');

const startServer = () => {
  const app = createApp();

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Express server is up and running at ${port}`);
  });
}

startServer();