import { Request, Response } from "express"
import { RepairsService } from "../services/repairs.service";
import { CreateAppointementDTO, CustomError } from "../../domain";

export class RepairsController {
    constructor (
        private readonly repairService: RepairsService
    ) {}

    createRepair = async (req:Request, res:Response) => {
        const [ error, createRepairDto] = CreateAppointementDTO.create(req.body);

        if(error) return res.status(422).json({ errors: error})

        this.repairService.createRepair(createRepairDto!)
        .then((data: any) => res.status(201).json(data))
        .catch((error: any) => {
            return {
                errors: error
            }
        })
    }

    findAllRepairs = async (req: Request, res:Response) => {
        this.repairService.findAllRepair()
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            return{
                message: CustomError.badRequest(error)
            }
        })
    };

    findOneRepair = async (req: Request, res:Response) => {

        const { id } = req.params;

        this.repairService.findOneRepair(id)
        .then((data: any) => res.status(200).json(data))
        .catch((error: unknown) => {
            return {
                message: error
            };
        });
    };

    updateRepair = async (req: Request, res:Response) => {
        const { id } = req.params;
        
        this.repairService.updateRepair(id)
        .then((data) => res.status(201).json(data))
        .catch((error) => {
            return {
                message: error
            }
        })
    }

    cancelRepair = async (req: Request, res:Response) => {
        const { id } = req.params;

        this.repairService.cancelRepair(id)
        .then((data) => res.status(201).json(data))
        .catch((error) => {
            return {
                message: error
            }
        })
    }     
};