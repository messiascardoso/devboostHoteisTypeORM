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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
let Todo = class Todo {
    constructor(title, completed, user) {
        this.title = title;
        this.completed = completed;
        this.user = user;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Todo.prototype, "completed", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.default, user => user.todos),
    __metadata("design:type", typeof (_a = typeof User_1.default !== "undefined" && User_1.default) === "function" ? _a : Object)
], Todo.prototype, "user", void 0);
Todo = __decorate([
    typeorm_1.Entity("todos"),
    __metadata("design:paramtypes", [String, Boolean, typeof (_b = typeof User_1.default !== "undefined" && User_1.default) === "function" ? _b : Object])
], Todo);
exports.default = Todo;
