const request = require('supertest');
const app = require('../index');
const db = require('../db');

const TEST_EMAIL = 'test12345@example.com'; // define once, reuse everywhere


afterAll(async () => {
    await db.query('DELETE FROM customer WHERE email = $1', [TEST_EMAIL]);
    await db.pool.end();
});

test('register succeeds with new user', async () => {
    const response = await request(app)
    .post('/auth/register')
    .send({
        "first_name": "Test",
        "last_name": "User",
        "address": "123 Test St",
        "postcode": "12345",
        "country": "Testland",
        "mobile": "1234567890",
        "email": TEST_EMAIL,
        "password": "password1234565"
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
});

test('register fails with duplicate email', async () => {
    const response = await request(app)
    .post('/auth/register')
    .send({
        "first_name": "Test",
        "last_name": "User",
        "address": "123 Test St",
        "postcode": "12345",
        "country": "Testland",
        "mobile": "1234567890",
        "email": TEST_EMAIL,
        "password": "password1234565"
    })  

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Email already exists' });
});

test('login fails with incorrect password', async () => {
    const response = await request(app)
    .post('/auth/login')
    .send({
        "email": TEST_EMAIL,
        "password": "password1234565646463"
    })

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid credentials' })
});

test('login fails with incorrect email', async () => {
    const response = await request(app)
    .post('/auth/login')
    .send({
        "email": "test123@example.com",
        "password": "password1234565"
    })

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid credentials' })
});

test('login succeeds with correct credentials', async () => {
    const response = await request(app)
    .post('/auth/login')
    .send({
        "email": TEST_EMAIL,
        "password": "password1234565"
    })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
});