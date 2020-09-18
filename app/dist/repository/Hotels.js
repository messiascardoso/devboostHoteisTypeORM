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
const Rooms_1 = __importDefault(require("./Rooms"));
// Entidade representa uma tables no DB
let Hotels = class Hotels {
    constructor(nome, descricao, endereco, cidade, estrelas, foto_url) {
        this.nome = nome,
            this.descricao = descricao,
            this.endereco = endereco,
            this.cidade = cidade,
            this.estrelas = estrelas,
            this.foto_url = foto_url;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Hotels.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hotels.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hotels.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hotels.prototype, "endereco", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hotels.prototype, "cidade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Hotels.prototype, "estrelas", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hotels.prototype, "foto_url", void 0);
__decorate([
    typeorm_1.OneToMany(type => Rooms_1.default, rooms => rooms.hotels),
    __metadata("design:type", Array)
], Hotels.prototype, "rooms", void 0);
Hotels = __decorate([
    typeorm_1.Entity("hotels"),
    __metadata("design:paramtypes", [String, String, String, String, Number, String])
], Hotels);
exports.default = Hotels;
