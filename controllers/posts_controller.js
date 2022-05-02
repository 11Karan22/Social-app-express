const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.createPost=async function(req,res)
{
    try{ 
  await Post.create(
    {
        
        content:req.body.content,
        user:req.user._id
    },function(err,post)
    {
      if(err)
      {
          console.log('erorr in creating the post');
          return;
      }
      //console.log(req);
      return res.redirect('back');
    }
)
    }
    catch(err)
    {
console.log("err",err);
return;
    }
}
module.exports.destroy=async function(req,res)
{
    try{
    //.id why we used it bcoz it inbuilt method which converts ObjectId to string
    let post=await Post.findById(req.params.id);
    if(post.user==req.user.id)//yeh hmne middleware ki help se embed kiya hai req object ke andar
        {
            post.remove();
            await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
            
        }
        else{
            
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log("error",err);
        return;
    }
}
