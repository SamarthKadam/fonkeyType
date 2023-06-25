const express=require('express');
const viewController=require('../controllers/viewController');

const authController=require('../controllers/authController');

const router=express.Router();

router.get('/login',viewController.getLoginForm);
router.get('/signup',viewController.getSignupForm);
router.get('/home',authController.protect,viewController.getHomePage);


module.exports=router;