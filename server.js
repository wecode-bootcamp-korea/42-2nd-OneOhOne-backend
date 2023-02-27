require("dotenv").config();

const { createApp } = require("./app");
const {appDataSource} =require("./models");



const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await appDataSource
  .initialize()
  .then(()=> {
    app.listen(PORT,() => {
      console.log(`server is listening on ${PORT}`);
    });
  })
   .catch((err) => {
    console.log(`Failed server connect`);
    appDataSource.destroy();
  });
};

startServer();
