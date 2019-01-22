require("dotenv").config();

var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");

var password =  keys.mysql.password;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: password,
    database: "greatbay_db"
});

// function inquire() {
    
// }

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createSong();
    // updateSong();
    // deleteSong();
    // readSongs();
    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "Would you like to [POST] and auction or [BID] on an auction?",
            choices: ["POST", "BID", "EXIT"]
        }
    ]).then(function(selection) {
        if (selection.select === "POST") {
            inquirer.prompt([
                {
                name: "item",
                message: "What is the item you would like to submit?"
                }, {
                name: "category",
                message: "What category would you like to place your auction in?"
                }, {
                name: "bid",
                message: "What would you like your starting bid to be?"
                }
            ]).then(function(answers) {
                // var newProgrammer = new Programmer(answers.name, answers.position, answers.age, answers.language);
                // printInfo method is run to show that the newProgrammer object was successfully created and filled
                // newProgrammer.printInfo();
                // console.log("Inserting a new ...\n");
                var query = connection.query(
                    "INSERT INTO auctions SET ?",
                    {
                        item: answers.item,
                        category: answers.category,
                        bid: answers.bid
                    },
                function(err, res) {
                    // console.log(res.affectedRows + " auction added\n");
                    // Call updateProduct AFTER the INSERT completes
                    // updateSong();
                }
            );
        
          // logs the actual query being run
          console.log(query.sql);
            });
        }
        if (selection.select === "BID") {
            inquirer.prompt([
                {
                name: "item",
                message: "What auction would you like to place a bid in?"
                }, {
                name: "bid",
                message: "How much would you like to bid?"
                }
            ]).then(function(answers) {
                // var newProgrammer = new Programmer(answers.name, answers.position, answers.age, answers.language);
                // printInfo method is run to show that the newProgrammer object was successfully created and filled
                // newProgrammer.printInfo();
                // console.log("Inserting a new ...\n");
                var query = connection.query(
                    "UPDATE auctions SET ? WHERE ?",
                    [
                        {
                            bid: answers.bid
                        },
                        {
                            item: answers.item
                        }
                    ],
                function(err, res) {
                    console.log(res.affectedRows + " auction added\n");
                    // Call updateProduct AFTER the INSERT completes
                    // updateSong();
                }
            );
        
          // logs the actual query being run
          console.log(query.sql);
            });
        }
    connection.end();
    });
    
  });