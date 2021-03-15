 const express = require ("express");
const bodyParser = require ("body-parser");
const ejs=require ("ejs");
const Mongoose = require("mongoose");
const nodemailer= require("nodemailer");



const app =express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

connectionurl="mongodb+srv://Rupan:Rupan@01@cluster0.whfx5.mongodb.net/dinhata?retryWrites=true&w=majority"
// connectionurl =`mongodb+srv://peter:eNSqAd7eATH0zMh4@cluster0.jhbf8.mongodb.net/dinhata?retryWrites=true&w=majority`
Mongoose.connect(connectionurl,{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true,})
.then(()=>console.log("databaseconnected"))
.catch((error)=>console.log(error));

const contactschema=Mongoose.Schema({
firstname:String,
email:String,
number:Number,
subject:String
})

const volschema=Mongoose.Schema({
    firstname:String,
    email:String,
    number:Number,
    aadhar:Number,
    pan:String,
    subject:String
    })
const postmessage = Mongoose.model("postmessage",contactschema);
const volmessage = Mongoose.model("volmessage",volschema);

app.get("/",function(req,res){
res.render("home");
});
app.get("/organisationprofile",function(req,res){
    res.render("organisationprofile");
    });
app.get("/termsandcondition",function(req,res){
        res.render("termsandcondition");
        });

        app.get("/donate",function(req,res){
            res.render("donate");
            });
           
    

app.get("/ourwork",function(req,res){
    res.render("ourwork");
    });
    
app.get("/about",function(req,res){
        res.render("AboutUs");
        });
app.get("/contact",function(req,res){
    res.render("contactus")
})
app.post("/contact",async function(req,res){
 var input={ firstname : req.body.firstname,
    email : req.body.email,
   number : req.body.number,
    subject: req.body.subject,}
const newpost=new postmessage(input);
  await newpost.save();
  mail(input.email);
  res.redirect("/")
   console.log(firstname);
})
app.get("/vol",function(req,res){
    res.render("vol")
})

app.post("/vol",async function(req,res){
    var inputvol={ firstname : req.body.firstname,
       email : req.body.email,
      number : req.body.number,
      aadhar :req.body.aadhar,
      pan:req.body.pan,
       subject: req.body.subject,}
   const newvol=new volmessage(inputvol);
     await newvol.save();
     mail(inputvol.email);
     res.redirect("/")
      console.log(firstname);
   })



function mail(adres){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'rupanbiswas08@gmail.com',
            pass:'Rupan@01'
        }
    });
    
    let mailoptions ={
        from:'rupanbiswas08@gmail.com',
        to:`${adres}`,
        subject:'testing',
        text:'Thank you for contacting. We will get back to you'
    };
    
    transporter.sendMail(mailoptions, function (err, info) {
        if(err){
            console.log(err)
        }else{
            console.log("it worked")
        }
     });
    
    }

let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port,function(req,res){
        console.log("server started on port 8000");
    });