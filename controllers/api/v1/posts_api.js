const Post = require("../../../models/post");
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res)
{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate(
        {
            path:'comments',//further nesting se hmme uss user comment ka user miljayega
            populate:{
                path:'user'
            }
        }
    );
    return res.json(200,{
        message:"List of posts changed",
        posts:posts
    })
}
module.exports.destroy=async function(req,res)
{
    try{
     let post=await Post.findById(req.params.id);//id ko jab url se fectch krna ho tab use krte hai!
     //ab hamari authentication lagegi
     if(post.user==req.user.id)
     {
      post.remove();
     await Comment.deleteMany({post:req.params.id});
     return res.json(200,{
         message:'post and comments related to it deleted!'
     });
    }
    else{
        return res.json(401,{
            message:"you can't delete this post!"
        });
    }
}
    catch(err)
    {

    }
}