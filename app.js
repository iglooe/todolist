const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Store list items in an array
var items = [];

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Handle GET requests to the "/" route
app.get("/", (req, res) => {
  // Create a new date object
  var today = new Date();

  // Get the current day
  var currentDay = today.getDay();
  var day = "";

  // Set options for formatting the date
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  // Format the date as a string
  var day = today.toLocaleDateString("en-US", options);

  // Render the "list" template and pass in the current day and list items
  res.render("list", { kindOfDay: day, newListItems: items });
});

// Handle POST requests to the "/" route
app.post("/", (req, res) => {
  // Get the new item from the request body
  var item = req.body.newItem;

  // Add the item to the list
  items.push(item);

  // Redirect the user back to the home page
  res.redirect("/");
});

// Start the Express app and listen on port 3000
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
