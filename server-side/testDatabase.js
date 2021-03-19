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
  
  const item ='CREATE TABLE IF NOT EXISTS item(itemId INT PRIMARY KEY, name TEXT NO NULL, description TEXT, gender TEXT, type TEXT NOT NULL, colour TEXT, price FLOAT)';
  db.run(item, (err) => {
    if (err) {
        // Table already created
        console.log('Table already created.');
        throw(err);
    }else{
     
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'REPLACE INTO item( name, description, gender, itemId, type, colour, price) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.run(insert, ['X Tshirt', "Yellow 90%cotton tshirt", "men", "T142", "top", "yellow",  "12.50"]);
      db.run(insert, ['Y Tshirt', "Yellow 90%cotton tshirt", "women", "T512", "top", "yellow",  "12.20"]);
      db.run(insert, ['X Jeans', "WHATEVER", "women", "T1242", "bottom", "yellow",  "15.50"]);
      db.run(insert, ['Y Pants', "ANOTHER WATHEVER", "men", "T5122", "bottom", "black", "20.00"]);
      
    }
  });

  const cart = 'CREATE TABLE IF NOT EXISTS cart(itemId INT PRIMARY KEY, price FLOAT)';
  db.run(cart, (err) => {
    if (err) {
         // Table already created
        console.log('Table already created.');
        throw(err);
    }
      console.log("Creating table cart")
  });

  

module.exports = db;