const Post=require('../models/post');

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