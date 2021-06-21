//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-srivathsan:16185131@cluster0.wqogq.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const homeStartingContent = "Welcome to our food review website";
const aboutContent = "This website is for all food lovers,me and my friends travel places to taste variety of foods and we thought of sharing our experience to all out there.so we decided to make a blog website for food and we will keep posting our experience and memories every week.stay tuned to get weekly updates about the restaurants we visit.";
const contactContent = "We'd love to hear from you.if you want us to review a restaurant. you can mail us the location and contact number of the restaurant.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title:String,
  content:String
};

const Post = mongoose.model("post",postSchema);

app.get("/", function(req, res){
  Post.find({},function(err,posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });


});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId},function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });


});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
