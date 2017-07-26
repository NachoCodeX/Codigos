let test= (req,res,next)=>{
  if(req.isAuthenticated()){
    return res.status(200).redirect('/profile');
  }
  return next();

};



module.exports=test;
