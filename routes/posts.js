const express=require('express');
const router=express.Router();

const postContoller=require('../controllers/posts_controller');

router.post('/createPost',postContoller.createPost);

module.exports=router;
