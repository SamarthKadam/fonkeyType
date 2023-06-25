exports.getLoginForm=(req,res)=>{
  return res.status(200).render('login');
}

exports.getSignupForm=(req,res)=>{
  return res.status(200).render('signup')
}

exports.getHomePage=(req,res)=>{
  return res.status(200).render('home',{
    name:req.user.name
  })
}