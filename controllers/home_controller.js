const Post = require("../models/post");
const User=require('../models/user');
module.exports.home=async function(req,res)
{
    //now wriing our code more cleanly
    try
    {
   //populate the user for each post
    let postsi=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate(
        {
            path:'comments',//further nesting se hmme uss user comment ka user miljayega
            populate:{
                path:'user'
            }
        }
    )
    
   let users= await User.find({});
    
        return res.render('home',{
        title:"Home KARAN",
        posts:postsi,
        all_users:users
        });
    
    } catch(err)
{
    console.log('Error ',err);
    return;
}
     


}
//module.exports.actionName=function();//action name likhna zaroori hai taaki access krne ke time kaam aaye!
