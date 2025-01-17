import { Users } from "../../data";
import { CreateUserDTO, CustomError } from "../../domain";

export class UserService {

    constructor (){}

    async createUser (data: CreateUserDTO) {
        const user = new Users();

        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.role = data.role;

        try{
            const newUser = await user.save()

            return newUser
        } catch (error) {
            throw CustomError.internalServer("Error creating the post!");
        }
    }

    async findAllUsers () {
        try{
            const users = await Users.find({
                where:{
                    status: "available",
                }
            })

            return users;
        } catch (error) {
            throw CustomError.internalServer("Error while obtaining all the users list!")
        }
    };

    async findOneUser (id: string) {

        const user = await Users.findOne({
            where:{
                id,
                status: "available",
            }
        })       

        if (!user) throw CustomError.notFound("User not found!")

        return user;        
    }

    async updateUser (id: string, userData: any){
        const user = await this.findOneUser(id);

        user.name = userData.name.trim();
        user.email = userData.name.trim();

        if (!user) throw CustomError.notFound("User not found!")

        try {
            return user.save();
        } catch (error) {
            throw CustomError.internalServer("There was an error while updating the user info!")
        }
    }

    async disableUser (id: string) {
        const user = await this.findOneUser(id);

        user.status = "disabled";

        if (!user) throw CustomError.notFound("User not found!")

        try{
            return user.save();
        } catch (error) {
            throw CustomError.internalServer("Error from desabling the user!")
        }
    }
}