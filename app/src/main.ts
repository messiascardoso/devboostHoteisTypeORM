import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { Connection, createConnection, Repository } from "typeorm";
import Hotel from "./repository/Hotels";
import Room from "./repository/Rooms";
import Reservation from "./repository/Reservations";
// import Todo from "./repository/Reservations";

const app: Application = express();

app.use(express.json());

app.get(
  "/hotels",
  async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();
    const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);
    const hotels: Hotel[] = await hotelsRepository.find();
    connection.close();
    return res.json({
      hotels,
    });
  }
);

app.post(
  "/hotels",
  async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);
    const { nome, descricao, endereco, cidade, estrelas, foto_url } = req.body;
    const hotel: Hotel = new Hotel(
      nome,
      descricao,
      endereco,
      cidade,
      estrelas,
      foto_url
    );
    await hotelsRepository.save(hotel);
    connection.close();
    return res.json({
      hotel,
    });
  }
);

app.put(
  "/hotels/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const { id } = req.params;
    const {
      nome,
      descricao,
      endereco,
      cidade,
      estrelas,
      foto_url,
    } = req.body as Hotel;
    const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);

    const hotel: Hotel | undefined = await hotelsRepository.findOne(id);

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
  }
);

app.delete(
    "/hotels/:id",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();
      const { id } = req.params;
      const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);
      const hotel: Hotel | undefined = await hotelsRepository.findOne(id);
  
      if (hotel) {
        await hotelsRepository.delete(hotel);
        connection.close();
        return res.status(200).send();
      }

      connection.close();
      return res.status(404).json({
          Error: 'Hotel não encontrado',
        });
    }
  );


  //Rooms
  app.get(
    "/rooms",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();

      const roomsRepository: Repository<Room> = connection.getRepository(Room);
      const rooms: Room[] = await roomsRepository.find();
      connection.close();
      return res.json({
        rooms,
      });
    }
  );
  
  app.post(
    "/rooms",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();
  
      const roomsRepository: Repository<Room> = connection.getRepository(Room);
      const { tamanho, numero, hotel } = req.body;
      const room: Room = new Room(
        tamanho,
        numero,
        hotel
      );
      await roomsRepository.save(room);
      connection.close();
      return res.json({
        room,
      });
    }
  );
  
  app.put(
    "/rooms/:id",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();
  
      const { id } = req.params;
      const {
        tamanho, numero, hotel
      } = req.body;

      const roomsRepository: Repository<Room> = connection.getRepository(Room);
  
      const room: Room | undefined = await roomsRepository.findOne(id);
  
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
    }
  );
  
  app.delete(
      "/rooms/:id",
      async (req: Request, res: Response): Promise<Response> => {
        const connection = await createConnection();
        const { id } = req.params;
        const roomsRepository: Repository<Room> = connection.getRepository(Room);
        const room: Room | undefined = await roomsRepository.findOne(id);
    
        if (room) {
          await roomsRepository.remove(room);
          connection.close();
          return res.status(200).send();
        }

        connection.close();
        return res.status(404).json({
            Error: 'Quarto não encontrado',
          });
      }
    );


  //Reservations
  app.get(
    "/reservations",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();

      const reservationsRepository: Repository<Reservation> = connection.getRepository(Reservation);
      const Reservations: Reservation[] = await reservationsRepository.find();
      connection.close();
      return res.json({
        Reservations,
      });
    }
  );
  
  app.post(
    "/reservations",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();
  
      const reservationsRepository: Repository<Reservation> = connection.getRepository(Reservation);
      const { checkin, checkout, room } = req.body;
      const reservations: Reservation = new Reservation(
        checkin,
        checkout,
        room
      );
      await reservationsRepository.save(reservations);
      connection.close();
      return res.json({
        reservations,
      });
    }
  );
  
  app.put(
    "/reservations/:id",
    async (req: Request, res: Response): Promise<Response> => {
      const connection = await createConnection();
  
      const { id } = req.params;
      const {
        checkin,
        checkout,
        room
      } = req.body;
      
      const reservationsRepository: Repository<Reservation> = connection.getRepository(Reservation);
      
      const reservation: Reservation | undefined = await reservationsRepository.findOne(id);
      
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

    }
  );
  
  app.delete(
      "/reservations/:id",
      async (req: Request, res: Response): Promise<Response> => {
        const connection = await createConnection();
        const { id } = req.params;
        const reservationsRepository: Repository<Reservation> = connection.getRepository(Reservation);
        const reservation: Reservation | undefined = await reservationsRepository.findOne(id);
    
        if (reservation) {
          await reservationsRepository.remove(reservation);
          connection.close();
          return res.status(200).send();
        }

        connection.close();
        return res.status(404).json({
            Error: 'Reserva não encontrada não encontrado',
          });
      }
    );


const port: any = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor up na porta ${port}`);
});
