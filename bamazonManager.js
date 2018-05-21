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

connection.connect(function(err) {
    if(err) throw err;
    manager();
});

function manager() {
    inquirer.prompt(
        {
            name: "choices",
            type: "list",
            message: "What do you want to check?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then (function(answer) {
        switch (answer.choices) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;  
        }
    });
}

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name); 
            console.log("Price: $" + res[i].price);
            console.log("Quantity: ", res[i].stock_quantity);
            console.log("-----------------------------");
        }
        manager();
    });
}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if(err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log(res[i].product_name);
            console.log("Quantity: ", res[i].stock_quantity);
        }
        manager();
    });
}

function addInventory() {
    //prompt manager to select product to update 
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the ID of the product to update inventory count."
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many more have you received?"
        }
    ]).then (function(input) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query (query, {item_id: input.item_id}, function(err, res) {
            if (err) throw err;
            console.log ("existing inventory count: ", res[0].stock_quantity);
            console.log("added inventory: ", input.stock_quantity);

            
            // console.log ("New inventory count for Item ID ", item_id, " has been updated to ", )
        })
    })
}

// function addProduct() {
//     var query = "INSERT INTO products SET ?";
//     connection.query (query, )
// }