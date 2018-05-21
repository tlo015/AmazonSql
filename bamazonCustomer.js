var mysql = require ("mysql");
var inquirer = require ("inquirer");

//connection to mysql database
var connection = mysql.createConnection ({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

//connect to mySql server and database 
connection.connect(function(err) {
    if(err) throw err;
    allItems();
});

//loop through all the items in the database
function allItems() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        for (var i=0; i<res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name); 
            console.log("Price: $" + res[i].price);
        }
    user();
    })
}

//prompted messages for the user 
function user() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the ID of the item you would like to purchase.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ]).then (function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {item_id: answer.item_id}, function(err, res) {
            if (err) throw err;

            //res[0] = selected item_id as an object
                // console.log("user selection: ", res[0]);
            //item_id of user selection 
                //console.log("user item id :", res[0].item_id)
            //res[0].stock_quantity = the number available in iventory 
                //console.log("inventory: ", res[0].stock_quantity);
            //answer.stock_quantity = the quantity ordered
                //console.log("user quantity ordered: ", answer.stock_quantity);

            if (res[0].stock_quantity >= answer.stock_quantity) {
                
                var query2 = "UPDATE products SET ? WHERE ?";
                connection.query(query2, [
                {
                    stock_quantity: res[0].stock_quantity - answer.stock_quantity
                },
                {
                    item_id: res[0].item_id
                }
                ], function(err) {
                    if (err) throw err;
                    console.log("Order has been placed");
                    console.log("Your order total is $", answer.stock_quantity*res[0].price)
                    connection.end();
                })

            } else {
                console.log("Insufficient quantity!");
                user();
            }
        })
    })
}

