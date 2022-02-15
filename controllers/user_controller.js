module.exports.profile=function(req,res)
{

    return res.render('user_profile',{
        title:"Profile"
    });
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    })
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    })
}
