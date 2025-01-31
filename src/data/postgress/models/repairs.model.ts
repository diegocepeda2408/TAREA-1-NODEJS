import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.model";

export enum RepairStatus{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}
@Entity()

export class Repairs extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{
        nullable: false
    })
    userId: string;

    @Column('date',{
        default: () => "CURRENT_DATE",
        nullable: false
    })
    date: Date;

    @Column('varchar',{
        nullable: false,
    })
    motorsNumber: string;

    @Column('text',{
        nullable: false,
    })
    description: string;

    @Column('enum',{
        enum: RepairStatus,
        default: RepairStatus.PENDING
    })
    status: RepairStatus;

    @ManyToOne(() => Users, (user) => user.repairs)
    user: Users
}