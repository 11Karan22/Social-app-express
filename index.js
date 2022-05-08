const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
//used for session cookie
const session=require('express-session');//this will exncrypt the key and store it in the cookie
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const passportJWT=require('passport-jwt');
const sassMiddleware=require('node-sass-middleware');
const app=express();

//flash message
const flash=require('connect-flash');
const customWare=require('./config/middleware');

const port=8000;
const db=require('./config/mongoose');//app ko batana bhi pdega nah ki hmne db ko access kra hai!

const MongoStore=require('connect-mongo')(session);
//setting up the scss but it should be before the our server gets started as this sjould be compiled before the server gets started
app.use(sassMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }
))

app.use(express.static('./assets'));//css js images aisi files
app.use(expressLayouts);


app.use(express.urlencoded());
app.use(cookieParser());

//to make upload path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);//yeh batane ke liye joh bhi scripts dynamically control ho rahe hai usme joh script tag yah css joh use hai overall header mai shift ho jaye!

app.set('view engine','ejs');
app.set('views','./views');//isse hamme directly pata chal jata hai ki jab bhi view ki baat aayegi toh iss folder mai jakar dekhna hai!

app.use(session({
    name:'codeial',
    secret:'tudootudoo',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err)
        {
            console.log(err|| 'no error in mongo-connect');
        }
    )
  
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customWare.setFlash);
app.use('/',require('./routes'));//yeh app ko batane ke liye joh bhi routes aayenge voh aage isko refer krein!

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`There is some issue :${err}`);
    }
    console.log(`Server is running on port :${port}`);
})
