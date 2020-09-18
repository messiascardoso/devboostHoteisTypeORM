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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import User from "./Hotels";
let Reservations = class Reservations {
    // @ManyToOne(type => User, user => user.todos)
    // user: User;
    constructor(checkin, checkout, created_at) {
        this.checkin = checkin,
            this.checkout = checkout,
            this.created_at = created_at;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Reservations.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reservations.prototype, "checkin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reservations.prototype, "checkout", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Reservations.prototype, "created_at", void 0);
Reservations = __decorate([
    typeorm_1.Entity("reservations"),
    __metadata("design:paramtypes", [Date, Date, Date])
], Reservations);
exports.default = Reservations;
