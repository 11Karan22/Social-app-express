module.exports.setFlash=function(req,res,next)
{
    res.locals.flash={
        'success': req.flash('success'),
         'error': req.flash('error')
    }
    next();//imp bhulna nhi hai yeh
    
}//we need to use this middle ware