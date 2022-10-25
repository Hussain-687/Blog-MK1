//jshint esversion:6

const express = require("express");

const ejs = require("ejs");

const _= require("lodash");



const homeStartingContent = "Hello and welcome to my first blog application using HTML, CSS, JavaScript, NodeJS, Express, and EJS.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


let posts = [];

app.get("/", function(req, res){
  res.render("home", {
      postContent: homeStartingContent,
      posts: posts});
  
})


app.get("/about", function(req, res){
  res.render("about", {aboutText: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactText: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  }
  posts.push(post);

  res.redirect("/");
})

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName)
  posts.forEach(function(post){
    const existingTitle = _.lowerCase(post.title)
    if (requestedTitle === existingTitle){
      res.render("post", {
        title: post.title, 
        content: post.content
      })
    }
  })
  
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
