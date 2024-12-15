# URL Shortener Service

## Overview
A TypeScript-based URL shortening service using Express, Prisma, and MySQL.

## Features
- Shorten long URLs to compact, unique short codes
- Redirect short URLs to original destinations
- Robust URL validation
- Unique short code generation

## Prerequisites
- Node.js (v18+)
- pnpm
- MySQL Database

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/shakib77/url-shortener-express-prisma.git
cd url-shortener
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment
1. Copy `.env.example` to `.env`
2. Update database connection details in `.env`

### 4. Set Up Database
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 5. Run the Application

#### Development Mode
```bash
pnpm dev
```

#### Production Build
```bash
pnpm build
pnpm start
```

### 6. Run Tests
```bash
pnpm test
```

## Project Structure
- `src/`: Source code
    - `controllers/`: Request handling logic
    - `services/`: Business logic
    - `routes/`: API route definitions
    - `utils/`: Utility functions
- `prisma/`: Database schema
- `tests/`: Unit and integration tests

## Technologies
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- EJS Templates
- Jest for testing

## License
This project is licensed under the ISC License.
