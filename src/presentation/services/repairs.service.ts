import { In } from "typeorm";
import { Repairs, RepairStatus, Users, UserStatus } from "../../data";
import { CreateAppointementDTO, CustomError } from "../../domain";

export class RepairsService {
    constructor () {}

    async findOneUser (id: string) {

        const user = await Users.findOne({
            where:{
                id,
                status: UserStatus.AVAILABLE
            }
        })       

        if (!user) throw CustomError.notFound("Client user not found!")
        
        return user; 
               
    }

    async createRepair ( postData: CreateAppointementDTO) {

        const user = await this.findOneUser(postData.userId);

        const repairSheet = new Repairs();

        repairSheet.userId = user.id;
        repairSheet.date = postData.date;
        repairSheet.motorsNumber = postData.motorNumber;
        repairSheet.description = postData.description;

        try{
            const newRepair = await repairSheet.save(); 

            return newRepair
        } catch (error){
            throw CustomError.internalServer('Error! The repair issue sheet has not been created!')
        }
    }

    async findAllRepair () {
        try{
            const findAllRepair = await Repairs.find({
                where: {
                    status: In(["PENDING","COMPLETED"]),
                }
            })

            return findAllRepair;
        } catch (error){
            throw CustomError.badRequest("There was an error while plotting the repairs list!")
        }
    }

    async findOneRepair(id: string) {
        const repair = await Repairs.findOne({
            where: {
                id
            }
        })

        if (!repair) {
            throw CustomError.notFound("Repair issue sheet was not found!")
        }

        return repair
    };

    async updateRepair (id: string) {
        const repair = await this.findOneRepair(id);

        repair.status = RepairStatus.PENDING;

        try {
            const updatedRepair = await repair.save();

            return updatedRepair
        } catch (error) {
            throw CustomError.internalServer("The repair status was not updated!")
        }
    };

    async cancelRepair (id: string){
        const repair = await this.findOneRepair(id);

        repair.status = RepairStatus.CANCELED;

        try{
            const canceledRepair = await repair.save();

            return canceledRepair;
        } catch (error) {
            throw CustomError.internalServer("Error! The repair issue sheet was not canceled!")
        }
    }
}