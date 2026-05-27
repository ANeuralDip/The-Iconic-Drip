const express = require("express");
const router = express.Router();
const db = require('../db');

router.get("/:item_id", async (req, res, next) => {
    try {
        var sql = 'SELECT item_id, name, type, category, size, price, image FROM items WHERE item_id = $1';
        var params = [req.params.item_id];
        console.log("items id: ", params);
        var rows = await db.query(sql, params);
        console.log("itemid get", rows);
        res.json(rows);
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

//get all items that have different attributes
router.get("/items", async (req, res, next) => {
    
    let sql = "";    
    var category = req.query.category;
    var type = req.query.type;
    if (type == null && category == null){
        sql=`SELECT item_id, name, type, category, size, price, image FROM items`;
    }
    else if (type == null) {//when both type and category are received from the front-end
        sql = `SELECT item_id, name, type, category, size, price, image FROM items WHERE category= $1`;
        var params = [category];
    }   
    else if (category == null){//when only category is received
        sql = `SELECT item_id, name, type, category, size, price, image FROM items WHERE type= $1`;
        var params = [type];
    }
    else if (type != null && category != null) {
        sql = `SELECT item_id, name, type, category, size, price, image FROM items WHERE type= $1 AND category= $2`;
        var params = [type, category];
    }
    
    var rows = await db.query(sql, params)
    try{
        res.json(rows);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
        
});

// Export the router
module.exports = router;