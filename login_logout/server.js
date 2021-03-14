const express = require("express");
const router = require("./router");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");

const port = process.env.PORT || 8080;
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join("__dirname", "public/assets")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/route", router);

app
  .get("/", (req, res) => {
    // console.log("hi");
    res.render("base", { title: "Login System" });
  })
  .listen(port, () => {
    console.log("Listening to server on http://localhost:3000");
  });
