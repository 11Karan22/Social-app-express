const express=require('express');
const router=express.Router();
const passport=require('passport');
const postContoller=require('../controllers/posts_controller');

router.post('/createPost',passport.checkAuthentication,postContoller.createPost);
router.get('/destroy/:id',passport.checkAuthentication,postContoller.destroy);
module.exports=router;
