NestJS 10 + TypeScript + TypeORM + PostgreSQL<br>
Seeds 3 products at startup (product1, product2, product3)<br>
Endpoints to create and list reviews (rating 1–5), with DTO + business validation<br>
Endpoint to list all products<br>
Swagger docs included<br><br>
How to run (Docker)<br>
docker compose up --build<br>

# API:     http://localhost:3000
# Swagger: http://localhost:3000/swagger

Notes<br>
DB runs in Docker (Postgres); data persists via volume.<br>
To reset data: docker compose down -v (app reseeds products on next start).<br>
