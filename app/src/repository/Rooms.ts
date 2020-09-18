import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotels";
import Reservation from "./Reservations";

@Entity("rooms")
export default class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tamanho: string;

    @Column()
    numero: number;

    @ManyToOne(type => Hotel, hotel => hotel.room,{ onDelete: "CASCADE"}) 
    hotel: Hotel;

    @OneToMany(type => Reservation, reservation => reservation.room)
    reservation: Reservation[];

    constructor(tamanho: string, numero: number, hotel: Hotel) {
        this.tamanho = tamanho,
        this.numero = numero,
        this.hotel = hotel
    }
}