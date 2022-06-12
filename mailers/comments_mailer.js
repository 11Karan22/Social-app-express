const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a function instead of creating
// newComment=function()
// module.exports=newComment
exports.newComment=(comment)=>{
let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    
    // console.log(comment);
    nodeMailer.transporter.sendMail({
        from:'karan0057.cse19@chitkara.edu.in',
        to:comment.user.email,
        subject:"New Comment published!",
        html:htmlString
    },
    (err,info)=>
    {
       if(err)
       {
           console.log('Error in sending mail',err)
           return;
       }
     console.log('Message sent',info);
     return;
    })
}
//ab call bhi toh krna hai isse