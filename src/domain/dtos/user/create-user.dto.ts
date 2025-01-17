import { regularExp } from "../../../config/regular-exp";

export class CreateUserDTO {
    constructor (
        public name: string,
        public email: string,
        public password: string,
        public role: string
    ) {}

    static create(object: {[key: string]: any}) : [string?, CreateUserDTO?] {

        const {name, email, password, role} = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!regularExp.email.test(email)) return ['Invalid Email!'];
        if (!password) return ['Missing Password'];
        if (!regularExp.password.test(password)) return ['The password must be at least 10 characters long; The character must contain one uppercase; The password must be at least one special character!']
        if (!role) return ['Missing role, please enter whether you are a client or an employee!']

        return [undefined, new CreateUserDTO(name, email, password, role)]
    }
}