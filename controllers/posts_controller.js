const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.createPost=function(req,res)
{
Post.create(
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
      console.log(req);
      return res.redirect('back');
    }
)
}
module.exports.destroy=function(req,res)
{
    //.id why we used it bcoz it inbuilt method which converts ObjectId to string
    Post.findById(req.params.id,function(err,post)
    {
        if(post.user==req.user.id)//yeh hmne middleware ki help se embed kiya hai req object ke andar
        {
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err)
            {
                return res.redirect('back');
            })
        }
        else{
            
            return res.redirect('back');
        }
    })
}
