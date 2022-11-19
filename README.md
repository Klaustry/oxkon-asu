# Oxkon ASU

- System for the formation, control and maintenance of project documentation

# Features

- Swagger Documentation
- JWT authentication with refresh & access token
- Role based authorization
- Data filtering
- Fully responsive design

# Authentication

Application generates 2 tokens on login. Access token and refresh token. Access token has a lifetime of 15 minutes and the refresh token has a lifetime of 1 year.

# How to setup

## **Deploy with Docker**

You can run the entire app using docker compose.

On root directory

```bash
docker-compose up -d
```

Application will be deployed on http://localhost:3000

Swagger Docs on http://localhost:3000/api/docs

## **Running locally**

## Backend

First you have to postgresql installed on your computer.

Edit the database properties on the backend/.env file.

On backend directory

### Installing the dependencies

```bash
yarn
```

### Running the app

```bash
$ yarn start
```

Backend will be started on http://localhost:5000

Swagger Docs on http://localhost:5000/api/docs

## Frontend

On frontend directory

### Installing the dependencies

```bash
yarn
```

### Running the app

```bash
$ yarn start
```

Frontend will be started on http://localhost:3000

# Testing

**Unit testing**

On backend directory

```bash
yarn test
```

**e2e api testing**

First start the backend locally.

On backend directory

Install the dependencies

```bash
yarn
```

Start the backend locally.

```bash
yarn start
```

Start the test

```bash
yarn test:e2e
```
