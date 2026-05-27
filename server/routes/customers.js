const express = require("express");
const router = express.Router();
const db = require('../db');

router.route("/customers")
    .post( async (req, res, next) =>{
        
        let sql = "INSERT INTO customer(cust_id, first_name, last_name, address, postcode, country, mobile, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        var params = [index, req.body.first_name, req.body.last_name, req.body.address, req.body.postcode, req.body.country, req.body.mobile, req.body.email]
        console.log(params)//testing console.log
        var rows = await db.query(sql, params)
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            console.log(rows)
            
            res.json(
                rows
            )
        index++
    })

    router.get("/customers/:email", async (req, res, next) => {

        let sql = `SELECT * FROM customer WHERE email = $1`;
        var params = [req.params.email]
        var rows = await db.query(sql, params)
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
            }
            res.json(
                rows
            )
    })

module.exports = router;