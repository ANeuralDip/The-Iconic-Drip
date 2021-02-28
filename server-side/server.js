//importing middleware and the database
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();

app.use(express.static('public'))//used for getting the items' pictures

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

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

//get all items
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
