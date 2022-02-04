const express = require("express");
const app = express();
const article_router = require("./routes/articles");

app.set("view engine", "ejs");

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
