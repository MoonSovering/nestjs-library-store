<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.mongodb.com/en" target="blank"><img src="https://www.josebernalte.com/wp-content/uploads/2018/02/mongoDB.png" width="420" alt="MongoDB Logo" /></a>
</p>

# Description
An REST API with [Nest](https://github.com/nestjs/nest) and [Mongo](https://www.mongodb.com/es)

## API

The app is running on PORT:3000 and expose the following APIs:


- **GET** - `/booklist` Expose all books
            `/booklist?limit=10&skip=1` (Optional query params)

- **POST** - `/booklist` Create a new book
  - **title** - *string*
  - **author** - *string*
  - **categories** - *string* ( Example: fantasy, action)
  - **image** - *file*
  - **description** - *string*

- **GET** - `/booklist/${id}` Getting book by ID (MongoID)

- **PATCH** - `booklist/${id}` Update book
  - **title** - *string* (Optional)
  - **author** - *string* (Optional)
  - **categories** - *string* (Optional)
  - **image** - *file* (Optional)
  - **description** - *string* (Optional)

## Installation

1. Clone repository
2. Execute

```bash
$ yarn install
```

3. Add NestCLI
```bash
$ yarn add -g @nestjs/cli
```

4. Clone file __.env.template__ and rename to __.env__

5. Fill the missing fields of the __.env__ file

6. Up database
```bash
docker-compse up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Stay in touch

- Author - [Armando Sanmartin]

## Stack use
* MongoDB
* Nest

## License

Nest is [MIT licensed](LICENSE).


