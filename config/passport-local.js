const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new localStrategy({//passport.use se batana hai passport ko ki hum use kr rahein hai is stratergy ko
 usernameField:'email'
},function(email,password,done)//inbuit function hai done
{
    User.findOne({email:email},function(err,user)
    {
    if(err)
    {
        console.log('errrrrrorr');
        return done(err);
    }
    if(!user || (user.password!=password))
    {
    console.log('Invalid username');
    return done(null,false);
    }
    return done(null,user);
    });
    
} 

))
//this is in he browser while setting up the connection with the database!
passport.serializeUser(function(user,done)
{
    done(null,user.id);
})

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

module.exports=passport;