# 🍩 The Simpsons API

Welcome to The Simpsons API, a comprehensive RESTful API that provides access to your favorite characters, episodes, and locations from the longest-running American sitcom, The Simpsons! This open-source project is built with modern technologies to deliver a fast, reliable, and well-documented API for developers and fans alike.

![The Simpsons Banner](https://thesimpsonsapi.com/hero.webp)

## 🚀 Features

- **Character Information**: Get details about your favorite characters from Springfield
- **Episode Guide**: Access information about all episodes across all seasons
- **Locations**: Explore various locations in Springfield
- **Fast & Efficient**: Built with NestJS and Fastify for optimal performance
- **Type-Safe**: Full TypeScript support
- **Comprehensive Testing**: Unit and E2E test coverage
- **Docker Support**: Easy deployment with Docker
- **RESTful API**: Follows REST principles for easy integration

## 🛠️ Technologies

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Runtime**: Node.js (v18+)
- **Database**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Testing**: [Vitest](https://vitest.dev/)
- **Containerization**: [Docker](https://www.docker.com/)
- **Package Manager**: npm (v9+)

## 📋 Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Docker (optional, for containerized development)
- PostgreSQL (can be run via Docker)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Facug03/the-simpsons-api.git
cd the-simpsons-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and update the values as needed:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials and other configurations.

### 4. Database Setup

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d
```

#### Option B: Local PostgreSQL

Make sure you have PostgreSQL installed and running, then update the database connection string in your `.env` file.

### 5. Run Database Migrations

```bash
npx prisma migrate dev
```

### 6. Start the Development Server

```bash
# Development mode with hot-reload
npm run dev

# Or build and start in production mode
npm run build
npm run start
```

## 📚 Data Attribution

This project uses data from [The Simpsons Wiki](https://simpsons.fandom.com/wiki/The_Simpsons_Wiki) under the [Creative Commons Attribution-ShareAlike License (CC BY-SA)](https://creativecommons.org/licenses/by-sa/3.0/).