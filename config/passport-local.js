const req = require('express/lib/request');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new localStrategy({//passport.use se batana hai passport ko ki hum use kr rahein hai is stratergy ko
 usernameField:'email',
 passReqToCallback:true//imp
},function(req,email,password,done)//inbuit function hai done
{
    User.findOne({email:email},function(err,user)
    {
    if(err)
    {
        req.flash('error',err);
        return done(err);
    }
    if(!user || (user.password!=password))
    {
    req.flash('error','Invalid Username/passWord');
    return done(null,false);
    }
    return done(null,user);
    });
    
} 

))

passport.serializeUser(function(user,done)
{
    done(null,user.id);
})
//abhi deserialize walla part use krna hai!
passport.deserializeUser(function(id,done)
{
  User.findById(id,function(err,user)
  {
    if(err)
    {
        console.log('errrrrrorr');
        return done(err);
    }
    
    return done(null,user);
  })
})
//check if user is authenticated ? but why no idea!
passport.checkAuthentication=function(req,res,next)
{

  if(req.isAuthenticated())
  {
  return next();

  }
  return res.redirect('/user/sign-in');
}
    //req.user contains the current signed in user from the session cookie and we 
    //are just passing this to locals for the views!
passport.setAuthenticatedUser=function(req,res,next)
{
  if(req.isAuthenticated())
  {
    res.locals.user=req.user;
  }
  return next();
}
   
  

module.exports=passport;