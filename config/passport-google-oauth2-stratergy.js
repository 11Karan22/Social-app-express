const passport=require('passport');
const googleStratergy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//clientID aur clientSecret se toh hum poore application ko connect krte hain
passport.use(new googleStratergy({
    clientID:"312634271922-tmouhrfa12j3lltvmdj6elruuckuf565.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback",
},
function(accessToken,refreshToken,profile,done)
{
    //yeh google humme callback url par profile field par information provide krega
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err)
        {
            console.log('error in google stratergy-passport',err);
            return;
        }
        console.log(profile);
        if(user)
        {
         return done(null,user);
         //object req.user set krne par hum usse sign in kr skte hai!

        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err)
                {
                    console.log('Error in creating user google stratergy-passport',err);
                  return;
                }
                return done(null,user);
            })
        }
    })
}
))



module.exports=passport;