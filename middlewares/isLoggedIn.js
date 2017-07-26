let isLoggedIn= (req,res,next)=>{
  let url=req.url,isAuth=req.isAuthenticated();
  // console.log(`URL -> ${req.url}  isAuth -> ${isAuth}`);
  if(isAuth){
    // res.header('Cache-Control','private ,no-cache, no-store, must-revalidate');
    return next();
  }
  else res.redirect('/');

}


module.exports=isLoggedIn;
