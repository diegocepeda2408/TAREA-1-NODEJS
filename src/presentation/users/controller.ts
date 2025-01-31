import { Request, Response } from "express"
import { CreateUserDTO, UpdateUserDTO } from "../../domain";
import { UserService } from "../services/user.service";
import { protectAccountOwner } from "../../config/validate.owner";

export class UserController {
    constructor (
        private readonly userService : UserService
    ) {}

    createUser = async (req:Request, res:Response) => {
        const [error, createUserDto] = CreateUserDTO.create(req.body);

        if (error) return res.status(422).json({message: error})

        this.userService.createUser(createUserDto!)
        .then((data: any) => res.status(201).json(data))
        .catch((error: unknown) => {
            return {
                message: error
            }
        })
    }

    findAllUsers = async (req: Request, res:Response) => {
        this.userService.findAllUsers()
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((error: unknown) => {
            return {
                message: error
            }
        })
    };

    findOneUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        this.userService.findOneUser(id)
        .then((data: any) => {res.status(200).json(data)})
        .catch((error: unknown) => {
            return {
                message: error
            }
        })
    }

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        const [ error, updateUserDto ] = UpdateUserDTO.create(req.body); 

        if (error) return res.status(422).json({
            message: error
        })

        this.userService.updateUser(id, updateUserDto!)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            return {
                message: error
            }
        })
    }

    disableUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const sessionUserId = req.body.sessionUserId.id; 

        if (!protectAccountOwner(id, sessionUserId)) {
            res.status(401).json({ message : "You are not the owner of this account!"})
        };

        this.userService.disableUser(id)
        .then((data) => res.status(201).json(data))
        .catch((error) => {
            return {
                message: error
            }
        })
    }

    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        this.userService.login(email, password)
        .then((data) => res.status(201).json(data))
        .catch((error: any) =>{
           return{ 
            message: error
        }
        });
    }
};