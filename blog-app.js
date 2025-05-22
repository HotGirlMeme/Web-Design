import express from "express";
import bodyParser from "body-parser";
import { title } from "process";

const app = express();
const port = process.env.PORT || 3000;
const reviews = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello from the web!");
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const { author, title, content } = req.body;
  if (content) {
    reviews.push({ content, author, title, date: new Date().toLocaleString() });
    res.redirect("/posted");
  } else {
    res.render("compose.ejs", { message: "Content can't be empty." });
  }
});

app.get("/posted", (req, res) => {
  res.render("posted.ejs");
});

app.get("/posts", (req, res) => {
  res.render("post.ejs", { reviews });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
