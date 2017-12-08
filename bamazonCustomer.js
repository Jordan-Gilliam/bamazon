var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the showList function after the connection is made to prompt the user
    // console.log("connected as id " + connection.threadId);
    start();
    showList();

});


function start() {
    console.log("");
    console.log("______________________________________");
    console.log("");
    console.log("Welcome to BAMAZON");
    console.log("");
    console.log("______________________________________");
    console.log("");
}


//show catalog
function showList() {
    console.log("");
    console.log("Bamazon Catalog");
    console.log("______________________________________");
    console.log("");
    //read product table
    connection.query("SELECT * FROM products", function(err, res) {
        //loop through each row and console log each item
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].id + "\n Name: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price: $" + res[i].price + "\n Stock Avaiability: " + res[i].stock_quantity + "\n");
        }
        console.log("______________________________________");
        console.log("");
    });

    setTimeout(function() {
        userInput();
    }, 500);

}


// function that handles customer input
function userInput() {


    console.log("");
    console.log("Shop around and specify how much you would like to buy!");
    console.log("");
    inquirer
        .prompt([{
                //getting ID input
                name: "id",
                type: "input",
                message: "Item's ID",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            { //getting quantity input
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])

        .then(function(answer) {
            // connect to database
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
                // loop through database
                for (var j = 0; j < results.length; j++) {
                    if (results[j].id === parseInt(answer.id)) {

                        // set chosen product
                        var chosenItem = results[j];

                        //checking to see if stock quantity is greater than the customer needs
                        if (chosenItem.stock_quantity >= answer.quantity) {
                            console.log("");
                            console.log("______________________________________________");
                            console.log("");
                            console.log("We have your item in stock!");
                            console.log("______________________________________________");
                            console.log("");

                            //setting new quantity based on previous quantity minus input quantity
                            var newQuantity = chosenItem.stock_quantity - answer.quantity;
                            //creating total price variable
                            var totalPrice = answer.quantity * chosenItem.price;

                            //updating new stock_quantity
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                        stock_quantity: newQuantity
                                    },
                                    {
                                        id: chosenItem.id
                                    }
                                ],
                                //console.log results
                                function(error) {
                                    if (error) throw err;
                                    console.log("Stock quantity: " + chosenItem.stock_quantity);
                                    console.log("");
                                    console.log("Availability was successfully updated. New stock quantity: " + newQuantity);
                                    console.log("");
                                    console.log("______________________________________________");
                                    console.log("");
                                    console.log("Thank you for shopping with us today! Your total payment is: $" + totalPrice + ".00");
                                    console.log("______________________________________________");
                                    console.log("");
                                    setTimeout(function() {
                                        showList();
                                    }, 5000);
                                }
                            );
                        }
                        else {
                            console.log("");
                            console.log("______________________________________________");
                            console.log("");
                            console.log("Sorry, insufficient quantity!");
                            console.log("______________________________________________");
                            console.log("");
                        }
                    }
                }

            });

        });

}
