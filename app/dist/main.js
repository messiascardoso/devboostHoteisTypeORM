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
// import Todo from "./repository/Reservations";
const app = express_1.default();
app.use(express_1.default.json());
app.get("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    const hotels = await hotelsRepository.find();
    connection.close();
    return res.json({
        hotels,
    });
});
app.post("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    const { nome, descricao, endereco, cidade, estrelas, foto_url } = req.body;
    const hotel = new Hotels_1.default(nome, descricao, endereco, cidade, estrelas, foto_url);
    await hotelsRepository.save(hotel);
    connection.close();
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
    const connection = await typeorm_1.createConnection();
    const { id } = req.params;
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    const hotel = await hotelsRepository.findOne(id);
    if (hotel) {
        await hotelsRepository.delete(hotel);
        connection.close();
        return res.status(200).send();
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
    const roomsRepository = connection.getRepository(Rooms_1.default);
    const { tamanho, numero, hotel } = req.body;
    const room = new Rooms_1.default(tamanho, numero, hotel);
    await roomsRepository.save(room);
    connection.close();
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
    const room = await roomsRepository.findOne(id);
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});
