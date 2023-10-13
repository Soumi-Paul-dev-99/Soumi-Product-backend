const app = require("./app");
require("dotenv").config();
// require("dotenv").config({path:"./config/config.env"});
const connectDatabase = require("./config/database");
//config



//handling uncaught exception
process.on("uncaughtException",(err)=>{
  console.log(`error:${err.message}`)
  console.log(`shutting down the server due to uncaught exception`);
  process.exit(1)
})
//connecting to database
connectDatabase();



const server = app.listen(process.env.PORT || 5500, () => {
  console.log(`server is working in ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`error :${err.message}`);
  console.log(`shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
