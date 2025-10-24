# MediScan Server

Node.js/Express API with MongoDB and Stripe used by the MediScan client.

## Stack
- Express 4
- MongoDB Node driver (no ODM)
- JWT auth (HMAC) via `ACCESS_TOKEN_SECRET`
- Stripe Payments (Payment Intents)
- CORS enabled, JSON body parsing

## Environment variables
Copy `.env.example` to `.env` and fill values:

```
PORT=5000
ACCESS_TOKEN_SECRET=replace-with-strong-random-secret
DB_USER=yourMongoDBUsername
DB_PASS=yourMongoDBPassword
STRIPE_SECRET_KEY=sk_live_or_test_key
```

## Key Collections
- `tests`
- `users` (fields include: email, isAdmin, active, profile fields)
- `banners` (field: isActive)
- `payments` (fields include: email, testId, status, reportLink)
- `suggestions`

## Current API surface (paths unchanged)
Public (no auth):
- GET `/` health message
- POST `/jwt` issue 6h JWT for provided user object
- GET `/tests` list tests
- GET `/tests/:id` get test by id (supports string or ObjectId)
- GET `/banners` list banners
- GET `/banners/active` list active banners
- GET `/users` list users (currently public)
- GET `/users/:email` list users by email (currently public)
- GET `/users/admin/:email` { isAdmin }
- GET `/users/active/:email` { isActive }
- POST `/users` create user
- POST `/create-payment-intent` Stripe PaymentIntent for price
- POST `/payments` create payment record
- GET `/payments` list all payments with joined test info
- GET `/payments/delivered/:email` delivered payments for email
- GET `/payments/:email` payments+tests for email
- GET `/payments/tests/:email` list testIds paid by email
- GET `/payments/test/:id` payments for a test id
- GET `/test/count` list tests with payment counts
- GET `/suggestions` list suggestions

Protected (JWT required):
- PATCH `/users/:email` update profile
- DELETE `/payments/:id` delete payment
- PATCH `/payments/:id` mark delivered and attach reportLink

Admin only (JWT + isAdmin):
- POST `/tests` create test
- DELETE `/tests/:id` delete test
- PATCH `/users/admin/:id` toggle admin
- PATCH `/users/active/:id` toggle active
- POST `/banners` create banner
- PATCH `/banners/active/:id` activate this banner, deactivate others
- DELETE `/banners/:id` delete banner

Notes:
- `PATCH /tests/:id` and `PATCH /tests/slots/:id` are currently unauthenticated.
- Many endpoints accept raw JSON without validation.
- Mixed id handling (string vs ObjectId) is supported by code.

## Run locally (development)
```
npm install
npm run start
```
Server listens on `http://localhost:${PORT || 5000}`.

## Production hardening checklist (no endpoint path changes)
- Security
  - Add `helmet`, strict `cors` allowlist, `express-rate-limit` on auth and payment routes, and `compression`.
  - Never log Authorization headers; remove debug `console.log` noise.
  - Validate and sanitize input with Joi/Zod (use celebrate middleware) on every route; reject malformed ObjectIds.
  - Enforce authorization: make sensitive routes like `PATCH /tests/:id`, `PATCH /tests/slots/:id`, and user listing admin-only.
- Auth
  - Keep `/jwt` for compatibility; optionally add refresh token flow via httpOnly cookie without removing existing route.
  - Ensure `PATCH /users/:email` only allows self-update or admin.
- Data integrity
  - Create indexes: `users.email` unique, `payments.email` and `payments.testId`, `banners.isActive`.
  - Normalize `payments.testId` to ObjectId in DB while keeping backward-compatible reads.
- Reliability
  - Connect once on startup; add health checks; implement graceful shutdown (SIGINT/SIGTERM) closing Mongo client and server.
  - Centralized error handler returning JSON, plus a 404 handler.
- Observability
  - Structured logging (`pino` or `winston`) with request logging (`pino-http`/`morgan`).
  - Add `/healthz` and `/readyz` (new routes, does not change existing ones).
- Stripe
  - Add Stripe webhook endpoint to reconcile payments; secure with webhook secret. Keep existing endpoints intact.
- Build & Deploy
  - Add Dockerfile and use a process manager (PM2) or node `--max-old-space-size` and cluster mode.
  - CI: lint + test + docker build; CD to your platform (Render/Fly/Heroku/EC2/K8s).
- Config hygiene
  - Commit `.env.example`, gitignore `.env`, and rotate secrets.

## Suggested next steps
1. Introduce helmet, cors allowlist, and rate limiting.
2. Add input validation for POST/PATCH/DELETE routes.
3. Protect currently public sensitive routes with JWT/admin checks (paths unchanged).
4. Add logging and error handling middleware.
5. Add indexes in Mongo and a migration script.
6. Add Dockerfile and CI pipeline.

This document is advisory; the live API paths remain the same.