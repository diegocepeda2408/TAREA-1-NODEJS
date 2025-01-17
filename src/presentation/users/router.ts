import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";


export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const userService = new UserService()
        const userController = new UserController(userService);

        router.post('/', userController.createUser);
        router.get('/', userController.findAllUsers);
        router.get('/:id', userController.findOneUser);
        router.patch('/:id', userController.updateUser);
        router.delete('/:id', userController.disableUser)
        return router;
    }
}