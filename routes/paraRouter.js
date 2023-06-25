const express=require('express');
const paraControllerr=require('../controllers/paraController');
const router=express.Router();

router.get('/getRandom',paraControllerr.getRandom);

module.exports=router;

