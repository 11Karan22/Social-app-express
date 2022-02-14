const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const app=express();
const port=8000;
const db=require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/',require('./routes'));

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
