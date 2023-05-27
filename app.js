const express = require("express");
//const fs = require("fs");
//const _ = require("lodash");
const blogsRoutes = require("./routs/blogsRoute.js");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const DBURI =
  "mongodb+srv://yazan:yazan1234@database.pk2k6ll.mongodb.net/project";
mongoose
  .connect(DBURI)
  .then((res) => {
    app.listen(3000);
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");
app.set("views", "vue");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/about", (req, res) => {
  res.render("about", { title: "about", css: "./style.css" });
});
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.use("/blogs" , blogsRoutes);
app.use((req, res) => {
  res.render("404", { title: "404" });
});
