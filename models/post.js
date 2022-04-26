const mongoose=require('mongoose');

const postSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },
        user://isse hame refer krna hai! //very very imp
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'//joh hmne pehle user banaya tha usse refer kar raha hai yeh!
        },
        comments:[//hmme isse as an array store krna pdega taaki jaldi se access kr sake  
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment'  
            }
        ]
    },{
        timestamps:true
    }
);
const Post=mongoose.model('Post',postSchema);//we are mongodb that we are using this schema for Post 
module.exports=Post;