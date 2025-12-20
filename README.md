# Car Reports API

A NestJS-based API for car price estimation using historical sales data.

## Features

- User authentication with JWT
- Car report submission
- Admin approval system
- Price estimation based on approved reports
- Role-based access control

## Quick Start

```bash
npm install
npm run start:dev
```

API runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register user
- `POST /auth/signin` - Login
- `POST /auth/signout` - Logout
- `GET /auth/whoami` - Get current user

### Reports
- `POST /reports` - Submit report (authenticated)
- `GET /reports` - View reports (admin only)
- `PATCH /reports/:id` - Approve/reject report (admin)
- `GET /reports/estimate` - Get price estimate

## Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Submit Report
```bash
curl -X POST http://localhost:3000/reports \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"make":"Toyota","model":"Camry","year":2020,"mileage":50000,"lng":-122.4194,"lat":37.7749,"price":25000}'
```

### Get Price Estimate
```bash
curl "http://localhost:3000/reports/estimate?make=Toyota&model=Camry&year=2020&mileage=50000&lng=-122.4194&lat=37.7749"
```

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- SQLite
- JWT Authentication
- bcryptjs
