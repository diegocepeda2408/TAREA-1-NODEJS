import { Router } from "express";
import { RepairsController } from "./controller";
import { RepairsService } from "../services/repairs.service";

export class RepairsRoutes {

    static get routes(): Router {
        const router = Router();

        const repairService = new RepairsService()
        const repairsController = new RepairsController(repairService);

        router.post('/', repairsController.createRepair);
        router.get('/', repairsController.findAllRepairs);
        router.get('/:id', repairsController.findOneRepair);
        router.patch('/:id', repairsController.updateRepair)
        router.delete('/:id',repairsController.cancelRepair)
        

        return router;
    }
}