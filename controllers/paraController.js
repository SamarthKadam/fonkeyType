const catchAsync=require('../utils/catchasync');
const Para=require('../models/paraModel');

exports.getRandom=catchAsync(async(req,res,next)=>{

const count=await Para.countDocuments({});

let rndNo= Math.floor(Math.random()*count);
 const para= Para.find();
 const data=await para.skip(rndNo).limit(1);

 res.status(200).json({
    status:'success',
    data
 })
  
})
