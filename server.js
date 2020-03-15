const express = require("express");
const Article = require("./models/article");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const articleRouter = require("./routes/articles");

mongoose
  .connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Connection Fail", err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const article = await Article.find().sort({
    createdAt: "desc"
  });

  res.render("articles/index", { articles: article });
});

app.use("/articles", articleRouter);
app.listen(5000);
