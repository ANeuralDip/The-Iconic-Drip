# The Iconic Drip — E-Commerce Platform

Originally built as a university group project (Group 12), this repository is now being independently refactored and modernised by Paul-Andrei Ferariu.

## Project History

- **Original build (group project):** Full-stack e-commerce app built collaboratively for university coursework. Stack: React, Node.js/Express, MySQL, Auth0, React Bootstrap.
- **Current refactor (solo, ongoing):** Independently migrating the application to a more production-aligned stack and architecture.

## Refactor Scope (In Progress)

- [x] Updated npm dependencies
- [x] Migrated database from MySQL to PostgreSQL
- [x] Replaced Auth0 with custom JWT-based authentication (bcrypt + jsonwebtoken)
- [ ] Migrating data fetching/caching to TanStack Query
- [x] Modernising routing (React Router upgrade)
- [ ] Lightweight repository pattern for backend data access
- [ ] Containerising backend with Docker
- [ ] Deploying to AWS (EC2 + RDS)
- [ ] Adding automated tests (backend auth coverage in progress)
- [ ] Adding CI pipeline (GitHub Actions: lint + test on push)

## Original Features (Group Project)

- [x] Customer registration and login
- [x] Payment method integration
- [x] Search bar
- [x] Add/remove products from basket
- [x] Product reviews
- [x] Sort
- [x] Newsletter signup
- [ ] Wish list
- [ ] Returns/policies
- [ ] Order history
- [ ] Delivery type/charge options
- [ ] Discounts/deals
- [ ] Filter

## Tech Stack (Current)

**Frontend:** React, React Router, TanStack Query, React Bootstrap, Material-UI
**Backend:** Node.js, Express.js
**Auth:** JWT (jsonwebtoken) + bcrypt for password hashing
**Database:** PostgreSQL (migrated from MySQL)
**Testing:** Jest, Supertest
**Infra (in progress):** Docker, AWS EC2 + RDS

## Running Locally

1. Clone the repository
2. Set up a local PostgreSQL instance and update connection details in the server config
3. Copy `server/example.env` to `server/.env` and fill in your DB credentials and a `JWT_SECRET` (any long random string)
4. Run `npm install` in both `client` and `server` directories
5. Start the backend: `cd server && npm run dev`
6. Start the frontend: `cd client && npm start`
7. Navigate to `http://localhost:3000/`

### Running Tests

```
cd server && npx jest
```

## Contributors

Original group project: Group 12 (university coursework)
Current refactor: [Paul-Andrei Ferariu](https://github.com/ANeuralDip)