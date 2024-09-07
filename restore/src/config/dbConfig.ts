import { DataSource } from "typeorm";
import dotenv from "dotenv"

dotenv.config({ path: ".env" });


const postgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.EXTERNAL_USER_DB_HOST,
    port: Number(process.env.EXTERNAL_USER_DB_PORT),
    username: process.env.EXTERNAL_USER_DB_USERNAME,
    password: process.env.EXTERNAL_USER_DB_PASSWORD,
    database: process.env.EXTERNAL_USER_DB_NAME,
    logging: true,
    synchronize: true,
    entities: [
        "src/models/*{.js,.ts}"
    ],
    migrations: ["src/migrations/*{.js,.ts}"],
})

// MongoDB Data Source
// const mongoDataSource = new DataSource({
//     type: "mongodb",
//     url: process.env.MONGO_DB_URL, 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     database: process.env.MONGO_DB_NAME,
//     synchronize: true,
//     logging: false,
//     entities: [
//         "src/models/*{.js,.ts}"
//     ],
// });

export { postgresDataSource };