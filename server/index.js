//importing middleware and the postgres database
var express = require("express");
var cors = require("cors");
var app = express();
var async = require("async")
const db = require('./db');
require('dotenv').config();
const itemsRouter = require('./routes/items');
const customerRouter = require('./routes/customers');
const basketRouter = require('./routes/baskets');
//use the items router for all routes starting with /items
app.use('/items', itemsRouter);

//use the customer router for all routes starting with /customers
app.use('/customers', customerRouter);

//use the basket router for all routes starting with /basket
app.use('/basket', basketRouter);



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