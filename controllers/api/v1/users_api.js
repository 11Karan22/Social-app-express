const User = require("../../../models/user");
const jwt=require('jsonwebtoken');
module.exports.createSession=async function(req,res)
{
    try{
    let user=await User.findOne({
        email:req.body.email
    });
    if(!user ||(user.password!=req.body.password))
    {
       return res.json(422,{
       message:"Invalid username or password"
       });
    }
    else{
   return res.json(200,{
     message:'sign in successfull,here is your token,please keep it safe',
     data:{
         token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000000'})//isse ek key generate hogi joh ki encrupted hogi!
     }
   })
    }
}
catch(err)
{
console.log("*****",err);
return res.json(500,{
message:"internal server error"
})
}
}