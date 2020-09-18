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