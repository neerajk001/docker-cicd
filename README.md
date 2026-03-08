# Express Users API

A simple Node.js backend built with Express. It exposes REST-style routes for a mock user list.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)

## Setup and run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   npm start
   ```

   The server will listen on **http://localhost:3000**.

## API routes

| Method | Path         | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/`          | Returns "Server is running"          |
| GET    | `/health`    | JSON: status, uptime, timestamp      |
| GET    | `/users`     | List all users                      |
| GET    | `/users/:id` | Get one user by id                  |
| POST   | `/users`     | Create a user (body: `name`, `email`) |
| DELETE | `/users/:id` | Delete a user by id                 |

## Example requests

**Get all users**

```bash
curl http://localhost:3000/users
```

**Get one user**

```bash
curl http://localhost:3000/users/1
```

**Create a user**

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\"}"
```

**Delete a user**

```bash
curl -X DELETE http://localhost:3000/users/2
```

## Project structure

```
.
├── package.json   # Dependencies and scripts
├── server.js      # Express app and all routes
└── README.md      # This file
```

Data is stored in memory only; restarting the server resets the user list to the initial sample data.
