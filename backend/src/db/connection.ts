import {createConnection} from "typeorm";
import { Favorite } from './entities/Favorite';

export default async () => {
    const port = parseInt(`${process.env.DB_PORT}`);
    return createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [Favorite],
        synchronize: true
    });
}