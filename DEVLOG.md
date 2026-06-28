## 2026-06-28

### VS Code debugger setup
- Set up `launch.json` for debugging the Express server with nodemon.
- Diagnosed a "double Debugger attached" issue — VS Code's Auto Attach was racing
  with the explicit launch config. Fixed by setting
  `"debug.javascript.autoAttachFilter": "disabled"` in settings.

### Bug: breakpoints not firing on `/items`
- Root cause wasn't the debugger at all — `itemsRouter` was mounted at `/items`
  in `index.js`, but the route inside `items.js` was *also* declared as
  `router.get("/items", ...)`, making the real path `/items/items`. Every request
  to `/items` was 404ing before it ever reached the breakpoint.
- Fix: route inside the router file should be `router.get("/", ...)` — the prefix
  is already supplied by `app.use('/items', itemsRouter)`.

### Bug: CORS error blocking frontend requests
- Installed `cors` and added `app.use(cors({ origin: 'http://localhost:3000' }))`.
- First attempt still failed — `cors()` was registered *after* the routers in
  `index.js`. Express middleware runs top-to-bottom, so by the time a request
  reached `cors()`, the router had already responded. Moved `cors()` (and
  `express.json()`, `express.urlencoded()`) above all `app.use('/...', router)`
  lines.
- A leftover wrinkle: a stale cached `304 Not Modified` response (from before
  `cors()` was added) kept masking the real `Access-Control-Allow-Origin` header
  on refresh. Added `Cache-Control: no-store` middleware so API responses are
  never cached.

### Replaced Auth0 with custom JWT auth
Auth0 stopped working cleanly after a dependency bump. Rather than re-debug a
third-party SDK, swapped it for a self-contained auth flow consistent with the
rest of the stack (Express + Postgres):

- Added a `password` (hash) column to the `customer` table. Kept `cust_id` as
  the auto-incrementing PK rather than switching to `email` — PKs should be
  stable, and email can change.
- `routes/auth.js`:
  - `POST /auth/register` — checks email uniqueness, hashes password with
    `bcrypt`, inserts the row, returns a signed JWT + safe profile fields.
  - `POST /auth/login` — looks up the user, verifies the password with
    `bcrypt.compare`, returns a JWT on success.
  - Both failure paths (unknown email, wrong password) return a generic
    `401 Invalid credentials` — deliberately not distinguishing the two, to
    avoid leaking which emails are registered.
  - JWT signed with `JWT_SECRET` (random secret, backend `.env` only, never
    sent to the frontend), 24h expiry.
- Added a catch-all Express error-handling middleware so `next(error)` calls
  always resolve to a response instead of hanging.

### Tests
- Added `tests/auth.test.js` (Jest + Supertest):
  register success → register duplicate email → login success → login wrong
  password → login non-existent email.
- Used a shared fixture user created by the first test and reused across the
  file, removed in `afterAll`.
- Fixed Jest's "did not exit" warning by closing the Postgres pool in
  `afterAll` (`db.end()`).

### Next up
- JWT verification middleware to protect `/customers` and `/basket`.
- Frontend: `AuthContext`, axios request interceptor for the `Authorization`
  header, `Login`/`Signup` forms, swap out `useAuth0()` in `Profile.jsx` and
  `AuthenticationButton.jsx`.
- Then: repository pattern, remaining test coverage, Docker, AWS.