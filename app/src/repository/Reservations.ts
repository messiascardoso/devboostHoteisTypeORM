import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import User from "./Hotels";


@Entity("reservations")
export default class Reservations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @CreateDateColumn()
    created_at: Date;

    // @ManyToOne(type => User, user => user.todos)
    // user: User;

    constructor(checkin: Date, checkout: Date, created_at: Date) {
        this.checkin= checkin, 
        this.checkout= checkout, 
        this.created_at= created_at
    }
}