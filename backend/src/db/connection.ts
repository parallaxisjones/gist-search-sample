import {createConnection} from "typeorm";

export default async () => {
    const port = parseInt(`${process.env.DB_PORT}`);
    return createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
}