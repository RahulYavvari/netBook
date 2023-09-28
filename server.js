const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

function MakePost(title, time, postBody){
    this.title = title;
    this.time = time;
    this.postBody = postBody;
}

app.post("/compose", function(req, res){
    console.log(req.body);

    let date = new Date();
    let title = req.body.postTitle;
    let postBody = req.body.postBody;

    let currentPost = new MakePost(title, date, postBody);

    posts.push(currentPost);

    console.log(posts);

    res.redirect("/home");
});

app.get("/", function(req, res){
    res.redirect("home");
});

app.get("/home", function(req, res){
    res.render("home",{
        posts: posts
    });
});

app.get("/compose", function(req, res){
    res.render("compose", {});
});

app.get("/about", function(req, res){
    res.render("about", {});
});


app.listen(3000, function(){
    console.log("[LOG__INIT__]: Connected to port 3000!");
});