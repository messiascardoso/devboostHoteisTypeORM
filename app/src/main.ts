import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { Connection, createConnection, Repository } from "typeorm";
import Hotel from "./repository/Hotels";
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

const port: any = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor up na porta ${port}`);
});
