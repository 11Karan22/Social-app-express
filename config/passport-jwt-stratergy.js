const passport=require('passport');
const JwtStrategy = require('passport-jwt/lib/strategy');
const JWTStratergy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;//extracting something from the headers abhi clear nhi hai4

const User=require('../models/user');
let opts={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial'

}
passport.use(new JwtStrategy(opts,function(jwtPayload,done)
{
User.findById(jwtPayload._id,function(err,user){//_id apne aap hi figure out krega
    if(err)
    {
        console.log('Error in finding user from JWT');
        return;
    }
    if(user)
    {
        return done(null,user);
    }
    else{
        return done(null,false);
    }
})
}));
module.exports=passport;