# Hotels

Back-End com TypeScript

##

### Prerequisites

- Mysql
- Docker

## Quick Start

### Clone source

```
$ git clone https://github.com/messiascardoso/devboostHoteisTypeORM
```

### Run Docker

```
$ cd devboostHoteisTypeORM
$ docker-compose up
```

##### - Started MySQL

##### - Started Node

##

### TEST using CURL

#### Hotels
- Lista Hotel
```
$ curl -XGET 'localhost:2000/hotels'
```

- Criar Hotel
```
$ curl -XPOST -d '{
	"nome": "Lucas Hotels",
	"descricao": "Hotel na beira da praia",
	"endereco": "Leblon",
	"cidade": "Rio de Janeiro",
	"estrelas": 5,
	"foto_url": "utl"
}' 'localhost:2000/hotels'
```

- Update Hotel
```
$ curl -XPUT -d '{
	"nome": "Lucas Hotels Edited",
	"descricao": "Hotel na beira da praia",
	"endereco": "Leblon",
	"cidade": "Rio de Janeiro",
	"estrelas": 5,
	"foto_url": "url2" 
}' 'localhost:2000/hotels/1'
```

- Delete Hotel
```
$ curl -XDELETE 'localhost:2000/hotels/1'
```

#### Rooms
- Lista Quarto
```
$ curl -XGET 'localhost:2000/rooms'
```

- Criar Quarto
```
$ curl -XPOST -d '{
	"tamanho": "2 metros quadrados",
	"numero": 201,
	"hotel": 2
}' 'localhost:2000/rooms'
```

- Update Quarto
```
$ curl -XPUT -d '{
	"tamanho": "3 metros quadrados",
	"numero": 201,
	"hotel": 1
}' 'localhost:2000/rooms/1'
```

- Delete Quarto
```
$ curl -XDELETE 'localhost:2000/rooms/4'
```

#### Reservations
- Lista Reservas
```
$ curl -XGET 'localhost:2000/reservations'
```

- Criar Reservas
```
$ curl -XPOST -d '{
	"checkin": "01/02/2018",
	"checkout": "01/10/2018",
	"room": 1
}' 'localhost:2000/reservations'
```

- Update Reservas
```
$ curl -XPUT -d '{
	"checkin": "01/05/2018",
	"checkout": "01/10/2018",
	"room": 3
}' 'localhost:2000/reservations/1'
```

- Delete Reservas
```
$ curl -XDELETE 'localhost:2000/reservations/1'
```