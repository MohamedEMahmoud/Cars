import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log(`Inserted User ${JSON.stringify(this)}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User ${JSON.stringify(this)}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Deleted User ${JSON.stringify(this)}`);
    }
}