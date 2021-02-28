var sqlite3 = require('sqlite3').verbose()

/** Create the database called item.db and create a table that will store some information about items
 * 
 */

// open the database
let db = new sqlite3.Database('item.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the item database.');
  });
  

  // create table 'item'
  const item ='CREATE TABLE IF NOT EXISTS item(itemId INT PRIMARY KEY, name TEXT NO NULL, description TEXT, type TEXT NOT NULL, colour TEXT, price FLOAT)';
  db.run(item, (err) => {
    if (err) {
        // Table already created
        console.log('Table already created.');
        throw(err);
    }else{
     
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'INSERT INTO item( name, description, itemId, type, colour, price) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(insert, ['X Tshirt', "Yellow 90%cotton tshirt", "T142", "Top", "yellow",  "12.20"]);
      db.run(insert, ['Y Tshirt', "Black polyester Tshirt", "T512", "Top", "black", "13.50"]);
    }
  });

module.exports = db;