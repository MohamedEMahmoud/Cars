import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    milage: number;

    @Column()
    year: number;

    @Column()
    price: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}