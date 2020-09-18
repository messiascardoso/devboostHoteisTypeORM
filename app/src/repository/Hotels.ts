import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Reservations from "./Reservations";
import Room from "./Rooms";

// Entidade representa uma tables no DB
@Entity("hotels")
export default class Hotel {
    // chave primaria auto incremental
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    endereco: string;

    @Column()
    cidade: string;

    @Column()
    estrelas: number;

    @Column()
    foto_url: string;

    @OneToMany(type => Room, room => room.hotel)
    room: Room[];

    constructor(nome: string, descricao: string, endereco: string, cidade: string, estrelas: number, foto_url: string ) {
        this.nome = nome,
        this.descricao = descricao,
        this.endereco = endereco,
        this.cidade = cidade,
        this.estrelas = estrelas,
        this.foto_url = foto_url
    }
}