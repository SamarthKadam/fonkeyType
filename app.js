const express=require('express');
const app=express();
const globaErrorHandler=require('./utils/errorControl');
const userRouter=require('./routes/userRouter');
const viewRouter=require('./routes/viewRouter');
const AppError = require('./utils/AppError');
const path=require('path');
const morgan = require('morgan');
const paraRouter=require('./routes/paraRouter');
const cookieParser=require('cookie-parser');

app.set('view engine','ejs');
app.set('views','./views')

app.use(morgan('dev'))
app.use(express.json()); ///This makes one to write in body that is for post request

app.use(express.static(path.join(__dirname+'/public')));
app.use(cookieParser());



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });

/// This is the middleware with next funtion


app.use('/',viewRouter);

app.use('/api/v1/para',paraRouter);
app.use('/api/v1/users',userRouter);


app.all('*',(req,res,next)=>{

    next(new AppError(`TypeError`,404));
})
//If user types some unusual error above code would take care


app.use(globaErrorHandler);
//This is the global error handler where

module.exports=app;