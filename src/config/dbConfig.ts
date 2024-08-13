import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type:"postgres",
    host: "192.168.29.56",
    port: 5432,
    username: "spade_admin",
    password: "Suhora@123",
    database: "spade_admin",
    logging: true,
    entities: [
         "src/models/*{.js,.ts}"
    ],
    synchronize: true,
})