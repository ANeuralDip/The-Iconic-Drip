# The Iconic Drip — E-Commerce Platform

Originally built as a university group project (Group 12), this repository is now being independently refactored and modernised by Paul-Andrei Ferariu.

## Project History

- **Original build (group project):** Full-stack e-commerce app built collaboratively for university coursework. Stack: React, Node.js/Express, MySQL, Auth0, React Bootstrap.
- **Current refactor (solo, ongoing):** Independently migrating the application to a more production-aligned stack and architecture.

## Refactor Scope (In Progress)

- [x] Updated npm dependencies
- [x] Migrated database from MySQL to PostgreSQL
- [ ] Migrating data fetching/caching to TanStack Query
- [ ] Modernising routing (React Router upgrade)
- [ ] Containerising backend with Docker/Kubernetes
- [ ] Deploying to AWS (EC2)
- [ ] Adding automated tests
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
**Database:** PostgreSQL (migrated from MySQL)
**Infra (in progress):** Docker, Kubernetes, AWS EC2

## Running Locally

1. Clone the repository
2. Set up a local PostgreSQL instance and update connection details in the server config
3. Run `npm install` in both `client` and `server` directories
4. Start the backend: `cd server && node server.js`
5. Start the frontend: `cd client && npm start`
6. Navigate to `http://localhost:3000/`

## Contributors

Original group project: Group 12 (university coursework)
Current refactor: [Paul-Andrei Ferariu](https://github.com/ANeuralDip)