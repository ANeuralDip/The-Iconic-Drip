//importing middleware and the mysql database
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var async = require("async")
const { Pool } = require('pg');

// Replace the string below with the "URI" or "Connection String" from your dashboard
const connectionString = REDACTED;

const pool = new Pool({
  connectionString: connectionString
});

// To keep your code working without changing every line:
const connection = {
  query: (text, params, callback) => {
    return pool.query(text, params, (err, res) => {
      // Postgres returns results in res.rows, so we pass that to your existing logic
      if (callback) callback(err, res ? res.rows : null);
    });
  }
};

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Server port
var HTTP_PORT = REDACTED

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});



// Root endpoint
app.get("/", (req, res, next) => {
    res.send(" Hello from server")
});
//route for getting item by id passed through parameters
app.get("/items/:item_id" , (req, res, next) => {

    
    var sql = 'SELECT * FROM items WHERE item_id = ? GROUP BY item_id';//sql statement to be executed
    var params = [req.params.item_id]//array containing all front-end parameters
    console.log("items id: ", params)//testing console.log
    connection.query(sql, params, (err, row) => {//executing sql query
        if (err) {//checking for errors
            res.status(400).json({
                "error": err.message
            });
            return;
        
        }
        console.log("itemid get",row)//testing console.log
        res.json(//sending response in json format to the front-end
            row
        )
    });
})

//create a route to the basket
app.route("/basket/:email")
    .post((req, res, next) => {
        
        var sql = 'INSERT INTO item_in_cart(item_id, size, quantity, total_item, cust_id) SELECT ?, ?, ?, ?, cust_id FROM customer WHERE email =?'
        let total = req.body.quantity * req.body.price;
        var params = [req.body.item_id, req.body.size, req.body.quantity, total, req.params.email]
        console.log("basket post", params)
        connection.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({
                        "error": err.message
                })
            return;}
            
            // console.log('basket: ', row)
            console.log("result id", result);
            res.json(result)
        })
    })
    
    .get((req, res, next) => {

        let sql = `SELECT *, items.item_id, items.size, item_in_cart.item_id, item_in_cart.size from items, item_in_cart WHERE items.item_id = item_in_cart.item_id AND items.size=item_in_cart.size AND item_in_cart.cust_id = (SELECT cust_id FROM customer WHERE email = ?)`;
        
        var params = [req.params.email]
        connection.query(sql, params, (err, rows) => {
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
        });
    })

    .delete((req, res, next) =>{
    
    
    let sql = "DELETE FROM item_in_cart WHERE item_id = ? AND size = ? AND cust_id = (SELECT cust_id FROM customer WHERE email = ?)"
    var params = [req.body.item_id, req.body.size, req.params.email]
    
    console.log(params)//testing console.log
    connection.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                    "error": err.message
            })
        return;
        }
        console.log("item deleted")
        res.send("item "+ req.body.item_id + " deleted")
        })
    })

    .put((req, res, next) => {
    let sql = "UPDATE item_in_cart SET quantity = $1 WHERE cust_id = (SELECT cust_id FROM customer WHERE email = $2) AND item_id = $3 AND size = $4";
    
    // Use async to handle multiple queries
    async.eachSeries(req.body, (element, callback) => {
        let params = [element.quantity, req.params.email, element.item_id, element.size];
        pool.query(sql, params, callback);
    }, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Basket updated" }); // MUST send a response!
    });
});
//search item by name
app.get("/search/:type" , (req, res, next) => {

    var sql = "SELECT  * FROM items WHERE type LIKE CONCAT('%', ?,  '%') GROUP BY item_id";
    var params = [req.params.type]
    console.log(params)//testing console.log
    connection.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        }
        res.json(
            rows
        )
    });
})

app.route("/customers")
    .post((req, res, next) =>{
        
        let sql = "INSERT INTO customer(cust_id, first_name, last_name, address, postcode, country, mobile, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        var params = [index, req.body.first_name, req.body.last_name, req.body.address, req.body.postcode, req.body.country, req.body.mobile, req.body.email]
        console.log(params)//testing console.log
        connection.query(sql, params, (err, rows) => {
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
        });
        index++
    })

    app.get("/customers/:email",(req, res, next) => {

        let sql = `SELECT * FROM customer WHERE email = ?`;
        var params = [req.params.email]
        connection.query(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    "error": err.message
                });
                return;
            }
            res.json(
                rows
            )
        });
    })
    

//get all items that have different attributes
app.get("/items", (req, res, next) => {
    
    let sql = "";    
    var category = req.query.category;
    var type = req.query.type;
    if (type == null && category == null){
        sql=`SELECT * FROM items`
    }
    else if (type == null) {//when both type and category are received from the front-end
        sql = `SELECT * FROM items WHERE category= ? GROUP BY item_id`;
        var params = [category];
    }   
    else if (category == null){//when only category is received
        sql = `SELECT * FROM items WHERE type= ? GROUP BY item_id`;
        var params = [type];
    }
    else if (type != null && category != null) {
        sql = `SELECT * FROM items WHERE type= ? AND category= ? GROUP BY item_id`;
        var params = [type, category];
    }
    
    console.log("items get", params)//testing console.log
    connection.query(sql, params, (err, rows) => {//executing query
        if (err) {//checking for errors
            res.status(400).json({
                "error": err.message
            });
            return;
        }
        res.json(//sending respone in json format
            rows
        )
    });
});