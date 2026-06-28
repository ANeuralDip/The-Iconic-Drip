const express = require("express");
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route("/auth/register")
    .post(async (req, res, next) => {
        try {
            const { first_name, last_name, address, postcode, country, mobile, email, password } = req.body;

            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const hashedPassword = await hashPassword(password);
            const sql = "INSERT INTO customer (first_name, last_name, address, postcode, country, mobile, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING first_name, last_name, address, postcode, country, mobile, email";
            const params = [first_name, last_name, address, postcode, country, mobile, email, hashedPassword];
            const result = await db.query(sql, params);
            const user = result[0];
            const token = generateToken(user);
            var payload = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                postcode: user.postcode,
                country: user.country,
                mobile: user.mobile,
                token: token
            };
            res.status(201).json(payload);
        } catch (error) {
            next(error);
        }

    })


router.route("/auth/login")
    .post(async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            var validCredentials = await comparePasswords(password, user.password);

            if (!validCredentials) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = generateToken(user);
            var payload = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                postcode: user.postcode,
                country: user.country,
                mobile: user.mobile,
                token: token
            };
            res.status(200).json(payload);

        }
        catch (error) {
            next(error);
        }
    })        

async function getUserByEmail(email) {
    const result = await db.query('SELECT * FROM customer WHERE email = $1', [email]);
    return result[0] ?? null;
    };

async function comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

function generateToken(user) {
    const payload = {
        email: user.email
    };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '24h' };
    return jwt.sign(payload, secret, options);
}

module.exports = router;