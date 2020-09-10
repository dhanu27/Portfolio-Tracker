const express = require("express");
const port = 8004;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const path = require("path");

app.use(express.urlencoded());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
