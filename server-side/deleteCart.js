var db = require("./testDatabase.js");

var sql = 'DELETE FROM cart'
    var params = []
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({
                    "error": err.message
            })
        return;
        }
    })