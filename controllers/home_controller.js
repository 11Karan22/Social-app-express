const Post = require("../models/post");
const User=require('../models/user');
module.exports.home=async function(req,res)
{
    // Post.find({},function(err,posts)// it was only showing the post
    // {

    //     return res.render('home',{
    //         title:"Home KARAN",
    //         posts:posts
    //     });
    // })

   //populate the user for each post
    Post.find({})
    .populate('user')
    .populate(
        {
            path:'comments',//further nesting se hmme uss user comment ka user miljayega
            populate:{
                path:'user'
            }
        }
    )
    .exec(function(err,postsi)
   {
    User.find({},function(err,users)
    { 
        return res.render('home',{
        title:"Home KARAN",
        posts:postsi,
        all_users:users
    });
        
    });
    
    
     
   })

}
//module.exports.actionName=function();//action name likhna zaroori hai taaki access krne ke time kaam aaye!
