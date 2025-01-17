import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{
        nullable: false
    })
    name: string;

    @Column('varchar',{
        nullable: false
    })
    email: string;

    @Column('varchar',{
        nullable: false
    })
    password: string;

    @Column('text',{
        nullable: false
    })
    role: string;

    @Column('varchar',{
        default: "available"
    })
    status: string;
}