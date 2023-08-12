const jwt=require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync=require('../utils/catchasync');
const User=require('../models/userModel');
const {promisify}=require('util');
const  dotenv=require('dotenv');


dotenv.config({path:'./../config.env'});



const signToken=(id)=>{
    const token=jwt.sign({
        id
    },process.env.JWTSECRET,{
        expiresIn:'90d'
    });
    return token;
}

const filterObj=(obj,...allowFields)=>{

    let filterObj={};

    Object.keys(obj).forEach(el=>{
        if(allowFields.includes(el))
        {
            filterObj[el]=obj[el];
        }
    })
    return filterObj;
}

exports.signup=catchAsync(async(req,res,next)=>{


    const user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });

    const token=signToken(user._id);


    res.cookie('jwt',token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
        httpOnly:true
    }) 


    res.status(201).json({
        status:'success',
        token,
        data:{
            user,
        }
    })
    
})

exports.login=catchAsync(async(req,res,next)=>{
    
    const{email,password}=req.body;

    if(!email|| !password)
    {
        return next(new AppError('Please provide email and password',400));
    }

    const user=await User.findOne({email}).select('+password');
    
     
    if(!user|| !(await user.correctPassword(password,user.password)))
    {
        return next(new AppError('Incorrect Email or password',400));
    }

    

    const token=signToken(user._id);
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
        httpOnly:true
    }) 

    res.status(200).json({
        status:'success',
        token
    })

})

exports.protect=catchAsync(async(req,res,next)=>{
    
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
         token=req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt)
    {
        token=req.cookies.jwt;
    }

    if(!token)
    {
        return res.redirect('/signup');
        //  next(new AppError('You are not logged in! Please login to get access',400));
    }


   const decoded=await promisify(jwt.verify)(token,process.env.JWTSECRET);

   const freshUser=await User.findById(decoded.id);
   if(!freshUser) return next(new AppError('The user belonging to token no longer exist',401));



   req.user=freshUser
    next();
})


exports.updateMyPassword=catchAsync(async(req,res,next)=>{

    const user=await User.findById(req.user._id).select('+password');
    if(!await user.correctPassword(req.body.CurrentPassword,user.password))
    {
        return next(new AppError('Your current password is wrong',401));
    }
    
    user.password=req.body.password;

   await user.save();

   res.status(200).json({
    status:'success',
    user,
   })

})
///update password using above stuff.It shouldn't be done using update method as it will not make encryption of data

exports.updateData=async(req,res,next)=>{

    const filterData=filterObj(req.body,'name','email');

    const user=await User.findByIdAndUpdate(req.user._id,filterData,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })

}

exports.deleteMe=catchAsync(async(req,res,next)=>{
    
    await User.findByIdAndUpdate(req.user._id,{active:false});

    res.cookie('jwt','logout_Done',{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
        httpOnly:true
    })

    res.status(204).json({
        status:'success',
        data:null
    })
})
