import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Users, UserStatus } from "../../data";
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

            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        } catch (error) {
            throw CustomError.internalServer("Error creating the post!");
        }
    }

    async findAllUsers () {
        try{
            const users = await Users.find({
                where:{
                    status: UserStatus.AVAILABLE,
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
                status: UserStatus.AVAILABLE,
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

        user.status = UserStatus.DISABLED;

        if (!user) throw CustomError.notFound("User not found!")

        try{
            return user.save();
        } catch (error) {
            throw CustomError.internalServer("Error from desabling the user!")
        }
    }

    async findUserByEmail(email: string) {
        const user = await Users.findOne({
            where:{
                email,
                status: UserStatus.AVAILABLE
            }
        })

        if (!user) throw CustomError.notFound("User not found!")

        return user;
    }

    async login (email: string, password: string) {
        const user = await this.findUserByEmail(email);

        const isMatching = bcryptAdapter.compare(password, user.password);

        if(!isMatching) throw CustomError.unAuthorized("Invalid Credentials!")

        const token = await JwtAdapter.generateToken({id: user.id});

        if (!token) throw CustomError.internalServer("Error from getting token!")

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }
}