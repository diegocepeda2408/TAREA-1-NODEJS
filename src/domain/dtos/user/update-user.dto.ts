import { regularExp } from "../../../config";

export class UpdateUserDTO {
    constructor(public readonly name: string,
        public readonly email: string
    ) {}

    static create(object: { [key: string]: any}):[string?, UpdateUserDTO?] {
        const { name, email } = object;

        if(!name) return ['Missing name!']
        if(name.length <= 2) return ['That is maybe a not existent name']
        if (!email) return ['Missing email'];
        if (!regularExp.email.test(email)) return ['Invalid Email!'];

        return [undefined, new UpdateUserDTO(name, email)]
        
    }
}