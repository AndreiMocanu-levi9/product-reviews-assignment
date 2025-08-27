NestJS 10 + TypeScript + TypeORM + PostgreSQL
Seeds 3 products at startup (product1, product2, product3)
Endpoints to create and list reviews (rating 1–5), with DTO + business validation
Endpoint to list all products
Swagger docs included
How to run (Docker)
docker compose up --build

# API:     http://localhost:3000
# Swagger: http://localhost:3000/swagger

Notes
DB runs in Docker (Postgres); data persists via volume.
To reset data: docker compose down -v (app reseeds products on next start).
