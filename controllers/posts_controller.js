const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.createPost=async function(req,res)
{
    try{ 
  let post=await Post.create(
    {
        
        content:req.body.content,
        user:req.user._id
    });
   
    if(req.xhr)
    {
        await post.populate('user');
        return res.status(200).json(
            {
                data:{
                    post:post
                },
                message:"post created"
            }
        );
    }
      
      req.flash('success','Post published!');
      return res.redirect('back');
    

    }
    catch(err)
    {
req.flash('error',err);
return res.redirect('back');
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
            if(req.xhr)
            {
                return res.status(200).json(
                    {
                        data:{
                            post_id:req.params.id,
                        },
                        message:"post deleted successfully"
                    }
                );
            }
            req.flash('success',"post and associated comments deleted");
                return res.redirect('back');
            
        }
        else{
            req.flash('error',"you can't delete this post")
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log("error",err);
        return;
    }
}
