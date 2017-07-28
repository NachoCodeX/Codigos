let getLogin=(req,res)=>{
  res.render('login',{title:'login',message:req.flash('message-login')});
}


let getHome=function(req,res){
  res.render('home',{title:"home",user:req.user,message:req.flash('message-login')});
}

let getSignUp = (req,res)=>{
  res.render('signup',{title:'signup',message:req.flash('message-signup')});
}

module.exports={
  getHome,
  getLogin,
  getSignUp
}
