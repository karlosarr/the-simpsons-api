<div align="center">
    <img src="https://thesimpsonsapi.com/hero.webp" alt="The Simpsons Banner" width="300" />
</div>

# 🍩 The Simpsons API

RESTful API for The Simpsons data. Built with NestJS, Prisma, and PostgreSQL.

## 🚀 Quick Start

```bash
# 1. Clone project
git clone https://github.com/Facug03/the-simpsons-api.git
cd the-simpsons-api

# 2. Install & start api
npm install
cd api && docker compose up -d
cd api && npx prisma migrate reset --force
npm run dev
```

## 📊 Fill Database

### Method 1: Bruno Collection (Recommended)

Use the included `api-request-collection`:

1. **Open Bruno**: Open the `api-request-collection` folder
2. **Execution order**:
   ```
   1. POST /episodes    → Create episodes
   2. POST /shorts      → Create shorts
   3. POST /locations   → Create locations
   4. POST /characters  → Create characters
   ```
3. **Run in order**: Each request has required data

### Method 2: Manual with curl

```bash
# Create episodes
curl -X POST http://localhost:3000/episodes \
  -H "Authorization: Bearer your-api-key" \
  -d @api-request-collection/episodes.json

# Create characters (references valid episodes)
curl -X POST http://localhost:3000/characters \
  -H "Authorization: Bearer your-api-key" \
  -d @api-request-collection/characters.json
```

## 🔧 Useful Commands

```bash
# Reset database
npx prisma migrate reset --force

# Check data
psql postgresql://user:password@localhost:5432/user -c "SELECT COUNT(*) FROM \"Character\";"

# Run tests
npm run test:e2e
```

## 📚 Documentation

- **API Documentation**: https://thesimpsonsapi.com/
- **Bruno Collection**: `api-request-collection/`

## 📚 Data Attribution

This project uses data from [The Simpsons Wiki](https://simpsons.fandom.com/wiki/The_Simpsons_Wiki) under the [Creative Commons Attribution-ShareAlike License (CC BY-SA)](https://creativecommons.org/licenses/by-sa/3.0/).