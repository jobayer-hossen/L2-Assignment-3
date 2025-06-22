# Library Management System Backend

This is a small backend project for manage a library. It is built using Express.js, MongoDB, Mongoose, TypeScript. A robust backend API for a Library Management System, built with Express.js, TypeScript, and MongoDB (via Mongoose). The project follows a clean architecture with modular folders for scalability and maintainability.

## Live API Link: https://l2-assignment-3-psi.vercel.app/

## Features

- **Book Management:** Full CRUD operations for books.
- **Borrowing System:** Borrow/return books with due dates and quantity tracking.
- **Type Safety:** Separate interface files for all models.
- **Aggregation Pipeline:** Aggregation Pipeline for showing Borrowed Books Summary.
- **Clean Architecture:** Organized folders for configs, controllers, routes, models, interfaces.

## Folder Structure

```
library-management-api/
src
  ├──app
      ├── config/         # Configuration files (DB, environment, etc.)
      ├── controllers/    # Request handlers
      ├── models/         # Mongoose models
      ├── interfaces/     # TypeScript interfaces for models
  ├──app.ts
  └──server.ts
├── package.json
├── .gitignore
├── vercel.json
├── tsconfig.json
└── README.md
```

## Technology used

- **Express.js** – Framework for Node.js
- **MongoDB** – NoSQL database
- **Mongoose** – ODM to interact with MongoDB
- **TypeScript** – JavaScript with types
- **dotenv** - Used for .env variable management


## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/jobayer-hossen/library-management-api.git
    cd library-management-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```
MONGODB_URI= " YOUR MONGO DB CREDENTIAL"
```

## Build & Run

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Books

- `GET /api/books` — List all books
- `GET /api/books/:id` — Get single book details
- `POST /api/books` — Add a new book
- `PUT /api/books/:id` — Update a book info
- `DELETE /api/books/:id` — Remove a book

### Borrowing

- `POST /api/borrow` — Borrow a book (requires book ID, user ID, quantity)
- `GET /api/borrow` — List all borrowed books with due dates

## License

This project is licensed under the [MIT License](LICENSE).