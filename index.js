const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const mongoose = require('mongoose');
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/blog");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
var str=[];
//mongoose db
const blogschema= new mongoose.Schema({
    title: String,
    main: String
});

const Blog=mongoose.model("blog",blogschema);



app.get("/",function(req,res){
    // res.sendFile(__dirname+"/index.html");
    Blog.find(function(err,blogs){
        if(err)
        {
            console.log("Error");
        }
        else
        {
            str=blogs;
        }
        });
    res.render("indeks",{data:str});

});
app.get("/write",function(req,res){
    res.render("write");
});
// app.post('/', function (req, res) {
//     var data=req.body.text;
//     console.log(data);
//     res.render("temp",{mainText:data});

//   });
  app.post('/write', function (req, res) {
    console.log("New Post Input !");
    var formJudul=req.body.judul;
    var formIsi=req.body.isi;
    console.log(formJudul);
    console.log(formIsi);
    // str.push({title:formJudul,main:formIsi});
    // Push ke DB
    const blog= new Blog({
        title:formJudul,
        main: formIsi
    });
    blog.save();
    console.log(str[0]);
    res.redirect("/");
  });


app.get('/home', function (req, res) {
res.redirect("/");
});
app.get('/feature', function (req, res) {
    res.render("feature");
    });
app.get('/contact', function (req, res) {
    res.render("contact");

});

app.get("/post/:titleinput",function(req,res){
    let find=false;
    let x=0;
    Blog.find(function(err,blogs){
        if(err)
        {
            console.log("Error");
        }
        else
        {
            str=blogs;
        }
        });
    console.log(str);
    if(str.length===0)
    {
        res.render("404");
    }
    for(var i=0;i<str.length;i++)
    {
        if(req.params.titleinput===str[i].title)
        {
            console.log("It's Match !")
            find=true;
            x=i;
        }
    }
    if(find)
    {
        res.render("temp",{judul:str[x].title,content:str[x].main});
    }
    else
    {
        res.render("404");
    }
});
app.listen(process.env.PORT||3000,function(req,res){
console.log("Running in Port 3000");
});