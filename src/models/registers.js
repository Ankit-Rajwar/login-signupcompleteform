//const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
var uniqueValidator = require('mongoose-unique-validator');
const empSchema=new mongoose.Schema({

    
    email:{ 
        type: String, required: true, unique: true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})


//tokken
//we use mehods when working with methods
empSchema.methods.generateAuthToken=async function(){
try{
    const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
   // console.log(token);
   return token;

}
catch(error){
    res.send("teh eroor part" +error);
   // console.log(error);
   // console.log(this._id);
}


}

//converting pass into hash

empSchema.pre("save",async function(next){

    if(this.isModified("password")){
      //console.log(`password before hasing ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        //console.log(`password before hasing ${this.password}`);
    }
    //const passhash= await bcrypt.hash(password,10);
    next();
    
})



 //we create collection
 empSchema.plugin(uniqueValidator);


 const Register=new mongoose.model("Registerr",empSchema);
 module.exports=Register;