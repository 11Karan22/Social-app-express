const Comment=require('../models/comment');
const Post = require('../models/post');
// const commentsMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
module.exports.create=async function(req,res)
{
  
    try{

        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user');
            // commentsMailer.newComment(comment);
            let job=queue.create('emails',comment).save(function(err){///save funtion ke baad hmme id bhi available hogi!
                 if(err)
                 {
                    console.log(err);
                    return;
                  }
                   console.log(job.id);
            })
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }
    catch(err)
    {
        console.log(err);
    }
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