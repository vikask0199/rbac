import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { postgresDataSource } from "./config/dbConfig";


dotenv.config({ path: ".env" });
const server = http.createServer(app);

const port = process.env.PORT;
process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1);
});

server.listen(port, async () => {
    await postgresDataSource.initialize().then(() => {
        console.log(`Database connection established successfully and port is ${port}`);
    }).catch((error: any) => {
        console.error("Failed to establish database connection", error);
        process.exit(1);
    })
});

process.on("uncaughtException", (error) => {
    console.log(error)
    process.exit(1);
});