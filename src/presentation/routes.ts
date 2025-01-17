import { Router } from "express";
import { RepairsRoutes } from "./repairs/router";
import { UserRoutes } from "./users/router";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/repairs',RepairsRoutes.routes);
        router.use('/api/user',UserRoutes.routes);

        return router;
    }
}