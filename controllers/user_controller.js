const User=require('../models/user');//we have defined the schema over there
module.exports.profile=function(req,res)
{

    return res.render('user_profile',{
        title:"Profile"
    });
}

//getting sign-up data
module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',
    {
        title:"codeial | sign-up"
    })
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    })
}

module.exports.create=function(req,res)
{
    //manual authentication!
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('/user/sign-up');
    }
    //now mogodb se data compare kiya jah rha hai!0
     User.findOne({email:req.body.email},function(err,user)//inbuilt function
     {
         if(err)
         {
             console.log('err in finding user in signing up');
             return;
         }
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
    
  res.redirect('/user/profile');
       
}
//for sign-out

module.exports.destroySession=function(req,res)
{
    req.logout();
  res.redirect('/');
       
}