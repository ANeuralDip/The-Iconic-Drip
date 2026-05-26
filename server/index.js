//importing middleware and the postgres database
var express = require("express");
var cors = require("cors");
var app = express();
var async = require("async")
const db = require('./db');
require('dotenv').config();



app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Start server
app.listen(process.env.PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", process.env.PORT))
});



// Root endpoint
app.get("/", async (req, res, next) => {
    res.send(" Hello from server")
});

//route for getting item by id passed through parameters
app.get("/items/:item_id" , async (req, res, next) => {

    
    var sql = 'SELECT * FROM items WHERE item_id = $1 GROUP BY item_id';//sql statement to be executed
    var params = [req.params.item_id]//array containing all front-end parameters
    console.log("items id: ", params)//testing console.log
    var rows = await db.query(sql, params)
    if (err) {//checking for errors
        res.status(400).json({
            "error": err.message
        });
        return;
    }
    console.log("itemid get",rows)//testing console.log
    res.json(//sending response in json format to the front-end
        rows
    )
})

//create a route to the basket
app.route("/basket/:email")
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
//search item by name
app.get("/search/:type" , async (req, res, next) => {

    var sql = "SELECT  * FROM items WHERE type LIKE CONCAT('%', $1,  '%') GROUP BY item_id";
    var params = [req.params.type]
    console.log(params)//testing console.log
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

app.route("/customers")
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

    app.get("/customers/:email", async (req, res, next) => {

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
    

//get all items that have different attributes
app.get("/items", async (req, res, next) => {
    
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