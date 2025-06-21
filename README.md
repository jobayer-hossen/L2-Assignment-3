# Library Management System Backend

A robust backend API for a Library Management System, built with **Express.js**, **TypeScript**, and **MongoDB** (via Mongoose). The project follows a clean architecture with modular folders for scalability and maintainability.

## Features

- **Book Management:** Full CRUD operations for books
- **Borrowing System:** Borrow books with due dates and quantity tracking
- **Mongoose Hooks & Methods:** Custom logic for data integrity and automation
- **Type Safety:** Separate interface files for all models
- **Clean Architecture:** Organized folders for configs, controllers, models, interfaces and other fils.

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
├── vercel.json
├── tsconfig.json
└── README.md
```

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
- `GET /api/books/:id` — Get book details
- `POST /api/books` — Add a new book
- `PUT /api/books/:id` — Update book info
- `DELETE /api/books/:id` — Remove a book

### Borrowing

- `POST /api/borrow` — Borrow a book (requires book ID, user ID, quantity)
- `GET /api/borrow` — List all borrowed books with due dates

## License

This project is licensed under the [MIT License](LICENSE).