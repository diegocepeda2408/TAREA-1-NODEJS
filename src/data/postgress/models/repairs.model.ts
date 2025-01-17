import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
        default: "pending"
    })
    status: string;
}