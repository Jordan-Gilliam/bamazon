DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Melatonin", "Health", 7.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razor", "Health", 10.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stax Chips", "Food", 1.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Panda Wireless", "Technology", 20, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Anker Battery", "Technology", 30, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweatshirt", "Clothing", 15.15, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cough Drops", "Health", 7.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Office Supplies", 300, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Muscle Milk", "Food", 25, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Multi Vitamin", "Health", 7.50, 10);


-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)