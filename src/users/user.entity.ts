import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

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