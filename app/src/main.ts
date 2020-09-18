import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { Connection, createConnection, Repository } from "typeorm";
import Hotel from "./repository/Hotels";
// import Todo from "./repository/Reservations";

const app: Application = express();

app.use(express.json());

app.get("/hotels", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();
    const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);
    const hotels: Hotel[] = await hotelsRepository.find();
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


const port: any = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});