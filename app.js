
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    Posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    startingContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    startingContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
  const newPost = {
    title: req.body.postTitle,
    content: req.body.postContent
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/posts/:blogName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.blogName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle)
      res.render("post", {
        postTitle: post.title,
        postContent: post.content
      })
  })
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
