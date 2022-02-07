const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Article = require("./models/article");
const app = express();
const article_router = require("./routes/articles");

mongoose.connect("mongodb://127.0.0.1:27017/demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/articles", article_router);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.listen(3000);
