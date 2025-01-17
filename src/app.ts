import { envs } from "./config";
import { PostGresDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import "reflect-metadata";

process.loadEnvFile();

async function main(){

    const server = new Server({
        port : envs.PORT,
        routes: AppRoutes.routes
    })

    await server.start();

    const postgres = new PostGresDatabase({
        host: envs.DB_HOST,
        port: envs.DB_PORT,
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        database: envs.DB_DATABASE
    })

    await postgres.connect();
};

main();