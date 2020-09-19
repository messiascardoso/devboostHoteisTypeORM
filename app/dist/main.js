"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Hotels_1 = __importDefault(require("./repository/Hotels"));
const Rooms_1 = __importDefault(require("./repository/Rooms"));
const Reservations_1 = __importDefault(require("./repository/Reservations"));
// import Todo from "./repository/Reservations";
const app = express_1.default();
app.use(express_1.default.json());
app.get("/hotels", async (req, res) => {
    let hotels = [];
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    try {
        hotels = await hotelsRepository.find();
        connection.close();
    }
    catch (error) {
        console.log('Erro ao conectar no banco');
        connection.close();
    }
    return res.json({
        hotels,
    });
});
// : Promise<Response>
app.post("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    console.log('req.body', req);
    const { nome, descricao, endereco, cidade, estrelas, foto_url } = req.body;
    const hotel = new Hotels_1.default(nome, descricao, endereco, cidade, estrelas, foto_url);
    try {
        await hotelsRepository.save(hotel);
        connection.close();
    }
    catch (error) {
        connection.close();
    }
    return res.json({
        hotel,
    });
});
app.put("/hotels/:id", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const { nome, descricao, endereco, cidade, estrelas, foto_url, } = req.body;
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    const hotel = await hotelsRepository.findOne(id);
    if (hotel) {
        hotel.nome = nome;
        hotel.descricao = descricao;
        hotel.endereco = endereco;
        hotel.cidade = cidade;
        hotel.estrelas = estrelas;
        hotel.foto_url = foto_url;
        await hotelsRepository.save(hotel);
        connection.close();
        return res.json({
            hotel,
        });
    }
    connection.close();
    return res.status(404).json({
        Error: 'Hotel não encontrado',
    });
});
app.delete("/hotels/:id", async (req, res) => {
    let hotel;
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    try {
        hotel = await hotelsRepository.findOne({
            where: { id: id }
        });
        console.log('hotel', hotel);
        if (hotel) {
            await hotelsRepository.delete(hotel);
            connection.close();
            return res.status(200).send();
        }
    }
    catch (error) {
        connection.close();
        console.log('error', error);
    }
    connection.close();
    return res.status(404).json({
        Error: 'Hotel não encontrado',
    });
});
//Rooms
app.get("/rooms", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const roomsRepository = connection.getRepository(Rooms_1.default);
    const rooms = await roomsRepository.find();
    connection.close();
    return res.json({
        rooms,
    });
});
app.post("/rooms", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { tamanho, numero, hotel } = req.body;
    const room = new Rooms_1.default(tamanho, numero, hotel);
    try {
        const roomsRepository = connection.getRepository(Rooms_1.default);
        await roomsRepository.save(room);
        connection.close();
    }
    catch (error) {
        console.log('error', error);
        connection.close();
    }
    return res.json({
        room,
    });
});
app.put("/rooms/:id", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const { tamanho, numero, hotel } = req.body;
    const roomsRepository = connection.getRepository(Rooms_1.default);
    const room = await roomsRepository.findOne(id);
    if (room) {
        room.tamanho = tamanho;
        room.numero = numero;
        room.hotel = hotel;
        await roomsRepository.save(room);
        connection.close();
        return res.json({
            room,
        });
    }
    connection.close();
    return res.status(404).json({
        Error: 'Quarto não encontrado',
    });
});
app.delete("/rooms/:id", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const roomsRepository = connection.getRepository(Rooms_1.default);
    const room = await roomsRepository.findOne({
        where: { id: id }
    });
    if (room) {
        await roomsRepository.remove(room);
        connection.close();
        return res.status(200).send();
    }
    connection.close();
    return res.status(404).json({
        Error: 'Quarto não encontrado',
    });
});
//Reservations
app.get("/reservations", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const reservationsRepository = connection.getRepository(Reservations_1.default);
    const Reservations = await reservationsRepository.find();
    connection.close();
    return res.json({
        Reservations,
    });
});
app.post("/reservations", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const reservationsRepository = connection.getRepository(Reservations_1.default);
    const { checkin, checkout, room } = req.body;
    const reservations = new Reservations_1.default(checkin, checkout, room);
    await reservationsRepository.save(reservations);
    connection.close();
    return res.json({
        reservations,
    });
});
app.put("/reservations/:id", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const { checkin, checkout, room } = req.body;
    const reservationsRepository = connection.getRepository(Reservations_1.default);
    const reservation = await reservationsRepository.findOne(id);
    if (reservation) {
        reservation.checkin = checkin;
        reservation.checkout = checkout;
        reservation.room = room;
        await reservationsRepository.save(reservation);
        connection.close();
        return res.json({
            reservation,
        });
    }
    connection.close();
    return res.status(404).json({
        Error: 'Reserva não encontrado',
    });
});
app.delete("/reservations/:id", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const reservationsRepository = connection.getRepository(Reservations_1.default);
    const reservation = await reservationsRepository.findOne({
        where: { id: id }
    });
    if (reservation) {
        await reservationsRepository.remove(reservation);
        connection.close();
        return res.status(200).send();
    }
    connection.close();
    return res.status(404).json({
        Error: 'Reserva não encontrada não encontrado',
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});
