# Project

This project is a transaction management system. It is a simple system that allows users to create accounts, and submit transactions to the system. The system will then process the transactions and return the results.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Docker and Docker Compose
```

All other dependencies are handled by docker.

### Installing

- Clone the repository
- Run `docker-compose up -d --build` to start the application
- Access the front-end application at `http://localhost:3000`
- Access the back-end application at `http://localhost:4000`

## Routes

The back-end application has the following routes:

- `POST /auth/login` - Login
- `POST /users` - Create a user
- `DELETE /users` - Delete logged in user
- `GET /transactions` - Get all transactions
- `POST /transactions/upload` - Upload a `.txt` file containing transactions

## Running the tests

### On the server

- Run `docker-compose exec server npm run test` to run the unit tests
- Run `docker-compose exec server npm run test:e2e` to run the e2e tests

### On the client

- Run `docker-compose exec client npm run test` to run the unit tests

## Built With

- [React](https://reactjs.org/) - The main library used
- [Next.js](https://nextjs.org/) - The web framework used
- [Node.js](https://nodejs.org/en/) - The server language used
- [Nest.js](https://nestjs.com/) - The server framework used
- [TypeScript](https://www.typescriptlang.org/) - The language used for both the client and server
- [Docker](https://www.docker.com/) - The containerization tool used
- [Docker Compose](https://docs.docker.com/compose/) - The tool used to orchestrate the containers
- [PostgreSQL](https://www.postgresql.org/) - The database used
- [Jest](https://jestjs.io/) - The testing framework used
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - The testing library used for React
