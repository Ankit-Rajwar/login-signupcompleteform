
require('dotenv').config()
const express =require("express");
const app=express();
const path=require("path");
require("./db/con");
const alert=require("alert-node");
const jwt=require("jsonwebtoken")
const Register=require("./models/registers");

const port=process.env.PORT ||3000;
const hbs=require("hbs");
const { Console } = require("console");
const bcrypt = require("bcryptjs");


const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set('views',templates_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>
{
res.render("index");
});

app.get("/register",(req,res)=>{
    
res.render("register");
})

//create a new user in data base
app.post("/register",async(req,res)=>{
   // console.log("jj");

  
  
    try{
       
         registr= new Register({
            email:req.body.email,
            password:req.body.password,





        })
        /* const email=req.body.email;
        const userinfo=await registr.findOne({email:email});
        console.log(userinfo.email);
        console.log(req.body.email); */
       /*  if(register.email==req.body.email)
        {
         console.log("jk");
        } */

        //checkng if two emails entered are not same
       // console.log("suces part"+registr);
        //password hash()

        //tokken
        /* else
        { */
        

        const token=await registr.generateAuthToken();

        

      //cookies
      //the res.cookie() is used to set the cookie name to value.
      //the value parameter may be sring or converetd to json .
      //synatx res.cookie("nameofcookie","value")
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+30000),
        httpOnly:true //we ca do nothing in cookie ex delete in http browser

      }); 




        const registered=await registr.save();
        res.status(201).render("regis"); 
       

    }  /* } */
    catch(error){
        res.status(400).send("please fill unique email");
        alert("please provide unique email that is not registeres first");
        
    }


})


//for login


app.get("/login",(req,res)=>{
    
    res.render("login");
    })



app.post("/login",async(req,res)=>{

    try{
        const email=req.body.email;
        const password=req.body.password;
        const userinfo=await Register.findOne({email:email});//finding here email if emal is not found it will go into catch part and if email is found the i will go for validation part  
       console.log(`password of register ${userinfo.password}`);
       console.log(`password of login ${password}`);

        const isMatch=await bcrypt.compare(password,userinfo.password);
       
         const token=await userinfo.generateAuthToken();
         console.log(token);
        
         
      
        // res.send(useremail);
        
        console.log(`password ${isMatch}`);

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+50000),
            httpOnly:true //we ca do nothing in cookie ex delete in http browser
            //secure:true // works only https
    
          }); 
    

         if(isMatch)
         {
             res.status(201).render("lo");
         }else{
            res.send("password no matching");
        }  
        

    }catch(error){
        res.status(400).send("invalid email")
    }
})
app.listen(port,()=>{
    console.log(`server running n port no ${port}`);
})