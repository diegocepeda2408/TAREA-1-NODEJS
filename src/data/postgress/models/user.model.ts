import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { bcryptAdapter } from "../../../config/bcrypt.adapter";

export enum UserStatus{
    AVAILABLE = "AVAILABLE",
    DISABLED = "DISABLED"
}

export enum UserRole {
    CLIENT = "client",
    EMPLOYEE = "employee"
}
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

    @Column('enum',{
        enum: UserStatus,
        default: UserStatus.AVAILABLE,
    })
    status: UserStatus;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcryptAdapter.encrypt(this.password);
    };

};