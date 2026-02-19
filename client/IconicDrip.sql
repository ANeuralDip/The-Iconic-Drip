CREATE DATABASE IF NOT EXISTS theiconicdrip;
USE theiconicdrip;

-- 1. The Items table (Products)
CREATE TABLE items (
    item_id INT,
    name VARCHAR(255),
    type VARCHAR(100),     -- e.g., 'Sneakers', 'Hoodie'
    category VARCHAR(100), -- e.g., 'Men', 'Women'
    size VARCHAR(50),
    price DECIMAL(10, 2),
    image VARCHAR(255),    -- Your code uses express.static('public')
    description TEXT,
    PRIMARY KEY (item_id, size) -- Composite key because same item has many sizes
);

-- 2. The Customer table
CREATE TABLE customer (
    cust_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(255),
    postcode VARCHAR(20),
    country VARCHAR(100),
    mobile VARCHAR(20),
    email VARCHAR(255) UNIQUE
);

-- 3. The Cart table (Link table)
CREATE TABLE item_in_cart (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    size VARCHAR(50),
    quantity INT,
    total_item DECIMAL(10, 2),
    cust_id INT,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id),
    FOREIGN KEY (item_id, size) REFERENCES items(item_id, size)
);