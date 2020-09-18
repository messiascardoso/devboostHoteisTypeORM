"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Hotels_1 = __importDefault(require("./repository/Hotels"));
// import Todo from "./repository/Reservations";
const app = express_1.default();
app.use(express_1.default.json());
app.get("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(Hotels_1.default);
    const hotels = await hotelsRepository.find();
    connection.close();
    return res.json({
        hotels
    });
});
// app.post("/hotels", async (req: Request, res: Response): Promise<Response> => {
//     const connection = await createConnection();
//     const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);
//     const user: User = new User(req.body.nome, req.body.email);
//     await userRepository.save(user); // &user.id = 1
//     connection.close();
//     return res.json({
//         id: user.id
//     });
// });
// app.put("/users", async (req: Request, res: Response): Promise<Response> => {
//     const connection = await createConnection();
//     const userRepository: Repository<User> = connection.getRepository(User);
//     const user: User | undefined = await userRepository.findOne(req.body.id);
//     if (user !== undefined) {
//         user.nome = req.body.nome;
//         user.email = req.body.email;
//         await userRepository.save(user);
//         connection.close();
//         return res.json({
//             user
//         });
//     }
//     connection.close();
//     return res.status(404).send();
// });
// app.get("/todos", async (req: Request, res: Response): Promise<Response> => {
//     const connection: Connection = await createConnection();
//     const userRepository: Repository<User> = connection.getRepository(User);
//     // const todoRepository: Repository<Todo> = connection.getRepository(Todo);
//     const user: User[] | undefined = await userRepository.find({
//         where: {
//             id: 2
//         },
//         relations: ["todos"]
//     });
//     connection.close();
//     return res.json({
//         user
//     });
// const user: User | undefined = await userRepository.findOne(2);
// if (user) {
//     const todo1: Todo = new Todo('Programar em React', false, user);
//     // todo.save(); SRP != SOLID
//     await todoRepository.save(todo1);
//     // Domain Driven Design | Clean Code | Clean Architecture | SOLID | Boundaries
//     const todo2: Todo = new Todo('Programar em Angular', false, user);
//     await todoRepository.save(todo2);
//     connection.close();
//     return res.json({
//         todo1,
//         todo2
//     });
// }
// connection.close();
// return res.status(404).send();
//});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});
