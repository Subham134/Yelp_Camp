var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var campSchema=new mongoose.Schema({
    name: String,
    image: String
});
var camping = mongoose.model("camping",campSchema);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
// camping.create({name:  "Ramchandi" , image:"https://www.hiltonbonnetcreek.com/wp-content/uploads/2016/12/HBC_LazyRiver-240x196.jpg"},function(err,camp){
//       if(err){
//           console.log("SOMETHING WENT WRONG");
//       }else{
//           console.log(camp);
//       }
// });
// var camp= [
//         {name:  "Ramchandi" , image:"https://www.hiltonbonnetcreek.com/wp-content/uploads/2016/12/HBC_LazyRiver-240x196.jpg"}
//      

app.get("/",function(req,res){
   res.render("home"); 
});
app.get("/campsites",function(req,res){
    camping.find({},function(err,camp){
        if(err){
            console.log("SOMETHING WENT WRONG");
        }else{
              res.render("camping" , {camp: camp});
        }
    });
    
  
});
app.post("/campsites",function(req,res){
    var name = req.body.name;
    var url = req.body.url;
    var obj = {name: name,image: url};
    camping.create(obj,function(err,camp){
        if(err)
        {
            console.log("SOMETHING WENT WRONG");
        }else{
             res.redirect("/campsites");
        }
    });
   
});
app.get("/campsites/new",function(req,res){
   res.render("new"); 
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("yelpcamp started");
    
});











