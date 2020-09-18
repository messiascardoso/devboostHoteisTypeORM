import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Rooms";
// import User from "./Hotels";


@Entity("reservations")
export default class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => Room, room => room.reservation, { onDelete: "CASCADE"})
    room: Room;

    constructor(checkin: Date, checkout: Date, room: Room) {
        this.checkin = checkin, 
        this.checkout = checkout,
        this.room = room
    }
}