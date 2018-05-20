CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (12,2) NOT NULL, 
    stock_quantity INT NOT NULL, 
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cartier Love Bracelet", "Jewelry", 6300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tiffany&Co Return to Tiffany Bracelet", "Jewelry", 3600, 5 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Christian Louboutin", "Shoes", 695, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Supreme Backpack", "Bags", 194, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Burberry Trench", "Clothing", 795, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Chanel 2.5", "Bags", 7350, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Converse All Stars", "Shoes", 35, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diane von Furstenberg Wrap Dress", "Clothing", 428, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Rolex", "Watches", 34850, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Ray-Ban Aviators", "Sunglasses", 153, 15);