const mongoose=require('mongoose');
const multer =require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
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
    },
    avatar:{
        type:String,
        
    }
   
},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb)
    {
        cb(null,file.fieldname+'-'+Date.now());//taaki date now islite use kiya taki koi clashes nah ho
    }
})
//static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
const User= mongoose.model('User',userSchema);//iss ki badolat hum baakiyo ko access kr skte hai!

module.exports=User;
