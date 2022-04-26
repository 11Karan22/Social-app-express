const Post = require("../models/post");

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
    Post.find({}).populate('user').exec(function(err,postsi)
   {
    
     return res.render('home',{
        title:"Home KARAN",
        posts:postsi
    });
     
   })
// Post.find({}).populate(
//     {
//         path:'Comments',
//         {
            
//         }
//     }
// )

}
//module.exports.actionName=function();//action name likhna zaroori hai taaki access krne ke time kaam aaye!
