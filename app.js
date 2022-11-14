const express = require("express");
var load = require('lodash');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
app.get("/",function(req,res) {
  res.render("home",{
    allPosts : posts
  });
});
app.get("/about",function(req,res) {
  res.render("about");
});
app.get("/contact",function(req,res) {
  res.render("contact");
});
app.get("/compose",function(req,res) {
  res.render("compose");
});
app.post("/compose",function(req,res) {
  const newPost = {
    postTitle : req.body.pubTitle,
    postText : req.body.pubText
  };
  posts.push(newPost);
  res.redirect("/");
});
app.get("/posts/:title",function(req,res) {
    let requestedTitle = load.lowerCase(req.params.title);
  for(let i=0;i<posts.length;i++)  {
    let currentTitle = posts[i].postTitle;
    let currentTitleHeader = load.lowerCase(currentTitle);
    if(currentTitleHeader === requestedTitle)    {
      res.render("post",{
         title : posts[i].postTitle,
         text : posts[i].postText
      });
    }}});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
