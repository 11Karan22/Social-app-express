const User=require('../models/user');//we have defined the schema over there

//profile page 
module.exports.profile=function(req,res)
{
   if(req.cookies.user_id)
   {
    User.findById(req.cookies.user_id,function(err,user)
    {
        if(err)
        {
            console.log('cannot find the user in profile segment');
            return ;
        }
        if(user)
        {
        return res.render('user_profile',{
            title:"hey i found the cookeyy!",
            user:user
        }) 
       }
       else{
    
       }
    })
   }
   else{
    return res.redirect('/user/sign-in');   
   }
}

//getting sign-up data
module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',
    {
        title:"codeial | sign-up"
    })
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    })
}

module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('/user/sign-up');
    }
     User.findOne({email:req.body.email},function(err,user)//inbuilt function
     {
         
         if(!user)
         {
             User.create(req.body,function(err,user)
             {
                if(err)
                {
                    console.log('err in creating one user');
                    return;
                }
                return res.redirect('/user/sign-in');
             })
         }
         else{
            return res.redirect('back');   
         }
     })
}
//users toh ek step pehle hi 
module.exports.createSession=function(req,res)
{
    //find the user 
   User.findOne({email:req.body.email},function(err,user)
   {
    if(err)
    {
        console.log('err in finding user in signing in');
        return;
    }
   if(user)
   {
   //password check
   if(user.password!=req.body.password)
   {
       return  res.redirect('back');
   }
   res.cookie('user_id',user.id);
   return res.redirect('/user/profile');
   }
   else{
   return res.redirect('back');
   }

   })




}