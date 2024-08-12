import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { AppDataSource } from "./config/dbConfig";


dotenv.config({ path: ".env" });
const server = http.createServer(app);

const port = 5000;
process.on("uncaughtException", (error) => {
  process.exit(1);
});


server.listen(port, () => {
  AppDataSource.initialize().then(()=>{
    console.log(`Database connection established successfully`);
  }).catch(()=>{
    console.error("Failed to establish database connection");
    process.exit(1);
  })
  console.log(`listening on ${port}`);
});

process.on("uncaughtException", (error) => {
  process.exit(1);
});