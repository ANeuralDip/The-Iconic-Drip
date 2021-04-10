//importing middleware and a test database
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var db = require("./testDatabase.js");
var app = express();

app.use(express.static('public'))//used for getting the items' pictures
app.use(cors());//enables cross-origin resource sharing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


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


//get all items from the databse
app.get("/items", (req, res, next) => {
    let sql = `SELECT itemId, name, description, type, colour, price FROM item`;
    var params = []
    db.all(sql, params, (err, rows) => {
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
});


//create a route to the basket
app.route("/basket")
    .post((req, res, next) => {

        var data = {
            id : req.body.itemId,
        }
        
        var sql = 'INSERT INTO cart(itemId) VALUES ( ?)'
        var params = [data.id]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({
                        "error": err.message
                })
            return;
            }
            res.json(data)
        })
    })
    .get((req, res, next) => {

        let sql = `SELECT *, item.itemId from item, cart WHERE item.itemId = cart.itemId`;
        var params = []
        db.all(sql, params, (err, rows) => {
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
    })

app.delete("/basket:id", (req, res, next) =>{

    let sql = "DELETE FROM cart WHERE itemId = ?"
    var params = [req.params.id]
        
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                    "error": err.message
            })
        return;
        }
        console.log("item deleted")
        res.send("item "+ req.body.itemId + " deleted")
    })
})

//search item by name
app.get("/search/:name" , (req, res, next) => {

    var sql = 'SELECT itemId, name, gender, description, type, colour, price FROM item WHERE name LIKE "%" || ? || "%"';
    var params = [req.params.name]
    db.all(sql, params, (err, rows) => {
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




//get all items that have different characteristics(in this case items for "men" with subtype "top")
app.get("/items/men/tops", (req, res, next) => {
    let sql = `SELECT itemId, name, gender, description, type, colour, price FROM item WHERE gender="men" AND type="top"`;
    var params = []
    db.all(sql, params, (err, rows) => {
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
});

//get all items that have different characteristics(in this case items for "women" with subtype "top")
app.get("/items/women/tops", (req, res, next) => {
    let sql = `SELECT itemId, name, gender, description, type, colour, price FROM item WHERE gender="women" AND type="top"`;
    var params = []
    db.all(sql, params, (err, rows) => {
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
});

//get all items that have different characteristics(in this case items for "men" with subtype "bottom")
app.get("/items/men/bottoms", (req, res, next) => {
    let sql = `SELECT itemId, name, gender, description, type, colour, price FROM item WHERE gender="men" AND type="bottom"`;
    var params = []
    db.all(sql, params, (err, rows) => {
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
});

//get all items that have different characteristics(in this case items for "women" with subtype "bottom")
app.get("/items/women/bottoms", (req, res, next) => {
    let sql = `SELECT itemId, name, gender, description, type, colour, price FROM item WHERE gender="women" AND type="bottom"`;
    var params = []
    db.all(sql, params, (err, rows) => {
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
});