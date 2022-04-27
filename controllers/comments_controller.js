const Comment=require('../models/comment');
const Post = require('../models/post');

module.exports.create=function(req,res)
{
    Post.findById(req.body.post,function(err,post)
    {
        if(post)
        {
            Comment.create(
                {
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },function(err,comment)
                {
                    post.comments.push(comment);
                    post.save();//we need to  do this everytime so that the changes are saved
                  res.redirect('/');
                }
            )
        }
    })
}
module.exports.destroy=function(req,res)
{
 Comment.findById(req.params.id,function(err,comment)
 {
if(comment.user==req.user.id)
{
    let postId=comment.post;//at the comment db we have stored the objectId of the post  
    comment.remove();
    Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post)
    {
        return res.redirect('back');
    })
    
}
else{
    res.redirect('back');
}
 })
   
}