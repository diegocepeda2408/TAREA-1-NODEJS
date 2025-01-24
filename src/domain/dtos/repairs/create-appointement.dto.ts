import z, { date } from 'zod'

const repairSchema = z.object({
    date: z.string({ message: "Date is required!"}).date(),
    motorNumber: z.string().min(2, { message: "Motorbike number is required!"}),
    description: z.string().min(1, { message: "Description is required!"}),
    userId: z.string().uuid({ message: "userId is required!"})

})
export class CreateAppointementDTO {

    constructor(
        public readonly userId: string,
        public readonly date: Date,
        public readonly motorNumber: string,
        public readonly description: string
    ){}

    static create(object: {[key: string]: any}) : [string?, CreateAppointementDTO?] {
        const { userId, date, motorNumber, description } = object;

        const result = repairSchema.safeParse(object);

        if (!result.success) {
            const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
                const field = err.path.join(".")
                acc[field] = err.message
                return acc
            },{} as Record<string, string>)

            return [errorMessages];
        };

        return [undefined, new CreateAppointementDTO(userId, date, motorNumber, description)]
    };
};