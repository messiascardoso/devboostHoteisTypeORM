import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Reservations from "./Reservations";
import Hotel from "./Hotels";

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

    constructor(tamanho: string, numero: number, hotel: Hotel) {
        this.tamanho = tamanho,
        this.numero = numero,
        this.hotel = hotel
    }
}