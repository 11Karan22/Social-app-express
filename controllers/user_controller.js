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
    if(req.body.password!=req.body.confirmed_password)
    {
        return res.redirect('back');
    }
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
    //later
}