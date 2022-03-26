const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const app=express();
const port=8000;
const db=require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);


app.use('/',require('./routes'));//yeh app ko batane ke liye joh bhi routes aayenge voh aage isko refer krein!

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);//yeh batane ke liye joh bhi scripts dynamically control ho rahe hai usme joh script tag yah css joh use hai overall header mai shift ho jaye!

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`There is some issue :${err}`);
    }
    console.log(`Server is running on port :${port}`);
})
