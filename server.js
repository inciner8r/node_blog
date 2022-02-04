const express = require("express");
const mongoose = require("mongoose");

const app = express();
const article_router = require("./routes/articles");

mongoose.connect("mongodb://127.0.0.1:27017/demo");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/articles", article_router);

const articles = [
  {
    title: "test",
    createdAt: new Date(),
    description: "test description",
  },
  {
    title: "test 2",
    createdAt: new Date(),
    description: "test description 2",
  },
];
app.get("/", (req, res) => {
  res.render("articles/index", { articles: articles });
});

app.listen(3000);
