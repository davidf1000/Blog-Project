const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const app=express();
const mongoose = require('mongoose');
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/blog");

//Buat schema = tabel dan strukturnya
const blogschema= new mongoose.Schema({
    title: String,
    main: String
});

const Blog=mongoose.model("blog",blogschema);

const blog= new Blog({
    title:"Judul Test1",
    main: "Ini isi test"
});

// blog.save();

Blog.find(function(err,blogs){
if(err)
{
    console.log("Error");
}
else
{
    console.log(blogs);
}
});


// const fruitSchema = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     review: String
// });

// const Fruit = mongoose.model("Fruit",fruitSchema);

// const fruit= new Fruit({
//     name:"Apple",
//     rating :7,
//     review:"test apple is gud"
// });

// fruit.save();


//f57f5768a8fe093231f127d8ceb4ae57-us10

//list id d638fa664f