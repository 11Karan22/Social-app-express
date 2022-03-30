const mongoose=require('mongoose');

//creating the schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
   
},{
    timestamps:true
});
const User= mongoose.model('User',userSchema);//iss ki badolat hum baakiyo ko access kr skte hai!

module.exports=User;
