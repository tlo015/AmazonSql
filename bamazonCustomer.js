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

//validate to ensure user input is a number 
function validate(value) {

}

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
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then (function(answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {item_id: answer.item_id}, function(err, res) {
                if (err) throw err;

                //res[0] = selected item_id as an object
                console.log("user selection: ", res[0]);
                //res[0].stock_quantity = the number available in iventory 
                console.log("inventory: ", res[0].stock_quantity);
                //answer.stock_quantity = the quantity ordered
                console.log("user quantity ordered: ", answer.stock_quantity);

                if (res[0].stock_quantity >= answer.stock_quantity) {
                    console.log("Order has been placed");
                } else {
                    console.log("Insufficient quantity!");
                    user();
                }
            })
        })
    
}

// function quantity() {
//     inquirer.prompt(
//         ).then (function(input) {
//             if(input > stock_quantity) {
//                 return ("Insufficient quantity!")
//             } else {
                
//             }
//         })
// }