export class CreateAppointementDTO {

    constructor(
        public readonly userId: string,
        public readonly date: Date,
    ){}

    static create(object: {[key: string]: any}) : [string?, CreateAppointementDTO?] {
        const { userId, date } = object;

        if(!userId) return ['Missing userId!']
        if(!date) return ['Missing date of the reapir issue!']

        return [undefined, new CreateAppointementDTO(userId, date)]
    };
};