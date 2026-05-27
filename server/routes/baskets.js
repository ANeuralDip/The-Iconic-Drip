const express = require('express');
const router = express.Router();
const db = require('../db');

router.route("/basket/:email")
    .post( async (req, res, next) => {
        
        var sql = 'INSERT INTO item_in_cart(item_id, size, quantity, total_item, cust_id) SELECT $1, $2, $3, $4, cust_id FROM customer WHERE email = $5'
        let total = req.body.quantity * req.body.price;
        var params = [req.body.item_id, req.body.size, req.body.quantity, total, req.params.email]
        console.log("basket post", params)
        var result = await db.query(sql, params)
            if (err) {
                res.status(400).json({
                        "error": err.message
                })
            return;}
            
            // console.log('basket: ', row)
            console.log("result id", result);
            res.json(result)
    })
    
    .get( async (req, res, next) => {

        let sql = `SELECT *, items.item_id, items.size, item_in_cart.item_id, item_in_cart.size from items, item_in_cart WHERE items.item_id = item_in_cart.item_id AND items.size=item_in_cart.size AND item_in_cart.cust_id = (SELECT cust_id FROM customer WHERE email = ?)`;
        
        var params = [req.params.email]
        var rows = await db.query(sql, params)
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            console.log(rows)//testing console.log
            res.json(
                rows
            )
    })

    .delete( async (req, res, next) =>{
    
    let sql = "DELETE FROM item_in_cart WHERE item_id = ? AND size = ? AND cust_id = (SELECT cust_id FROM customer WHERE email = ?)"
    var params = [req.body.item_id, req.body.size, req.params.email]
    
    console.log(params)//testing console.log
    await db.query(sql, params)
        if (err) {
            res.status(400).json({
                    "error": err.message
            })
        return;
        }
        console.log("item deleted")
        res.send("item "+ req.body.item_id + " deleted")
    })

    .put( async (req, res, next) => {
    let sql = "UPDATE item_in_cart SET quantity = $1 WHERE cust_id = (SELECT cust_id FROM customer WHERE email = $2) AND item_id = $3 AND size = $4";
    
    // Use async to handle multiple queries
    async.eachSeries(req.body, async (element, callback) => {
        let params = [element.quantity, req.params.email, element.item_id, element.size];
        await db.query(sql, params, callback);
    }, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Basket updated" }); // MUST send a response!
    });
});

module.exports = router;