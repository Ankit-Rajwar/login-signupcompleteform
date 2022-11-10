// const mongoose=require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/codoidregistration",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(()=>{
//     console.log(`connecction succsfull`);
// }).catch((e)=>{
//     console.log(`no connection`);
// })



const express = require("express");
const mongoose = require("mongoose");


const app = express();

app.use(express.json());

const username = "ankit";
const password = "ankit";
const cluster = "cluster0";
const dbname = "ankit";

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.jrekjk3.mongodb.net/?retryWrites=true&w=majority`,
   {
    useNewUrlParser: true, 

useUnifiedTopology: true
  }).then(()=>{
        console.log(`connecction succesfull`);
     }).catch((e)=>{
         console.log(`no connection`);
     });