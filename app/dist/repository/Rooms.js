"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Hotels_1 = __importDefault(require("./Hotels"));
let Room = class Room {
    constructor(tamanho, numero, hotel) {
        this.tamanho = tamanho,
            this.numero = numero,
            this.hotel = hotel;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Room.prototype, "tamanho", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Room.prototype, "numero", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Hotels_1.default, hotel => hotel.room, { onDelete: "CASCADE" }),
    __metadata("design:type", Hotels_1.default)
], Room.prototype, "hotel", void 0);
Room = __decorate([
    typeorm_1.Entity("rooms"),
    __metadata("design:paramtypes", [String, Number, Hotels_1.default])
], Room);
exports.default = Room;
