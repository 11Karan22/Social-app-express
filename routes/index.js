const express=require('express');//same instance share hota hai?
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log("router loaded!!");

router.get('/',homeController.home);

router.use('/user',require('./user'));//yahan pe ab middleware kaam aa rahe hai! isse check krna hoga!

module.exports=router;