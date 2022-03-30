const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');

const app=express();

const port=8000;
const db=require('./config/mongoose');//app ko batana bhi pdega nah ki hmne db ko access kra hai!
app.use(express.static('./assets'));//css js images aisi files
app.use(expressLayouts);


app.use(express.urlencoded());
app.use(cookieParser());
app.use('/',require('./routes'));//yeh app ko batane ke liye joh bhi routes aayenge voh aage isko refer krein!

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);//yeh batane ke liye joh bhi scripts dynamically control ho rahe hai usme joh script tag yah css joh use hai overall header mai shift ho jaye!

app.set('view engine','ejs');
app.set('views','./views');//isse hamme directly pata chal jata hai ki jab bhi view ki baat aayegi toh iss folder mai jakar dekhna hai!



app.listen(port,function(err)
{
    if(err)
    {
        console.log(`There is some issue :${err}`);
    }
    console.log(`Server is running on port :${port}`);
})
