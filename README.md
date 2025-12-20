# Car Reports API

A NestJS-based API for car price estimation using historical sales data.

## Features

- User authentication with JWT
- Car report submission
- Admin approval system
- Price estimation based on approved reports
- Role-based access control
- Automatic Admin User Seeding

## Quick Start

```bash
npm install
npm run start:dev
```

API runs on `http://localhost:3000`

## Default Admin User

On startup, the application seeds a default admin user if one does not exist.

**Configuration:**
A default admin user may be seeded for development; credentials must be provided via environment variables or secure configuration.

To enable admin seeding, set the following environment variables:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`


## API Endpoints

### Authentication

- `POST /auth/signup` - Register user
- `POST /auth/signin` - Login
- `POST /auth/logout` - Logout (Stateless, client-side token removal)
- `POST /auth/signout` - Signout (Alias for logout)
- `GET /auth/whoami` - Get current user

### Reports

- `POST /reports` - Submit report (authenticated)
- `GET /reports?approved=true|false` - View reports (admin only). Filter by approval status.
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
