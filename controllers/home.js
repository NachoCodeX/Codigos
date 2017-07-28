let getLogin=(req,res)=>{
  res.render('login',{title:'login',message:req.flash('message-login')});
}


let getHome=function(req,res){
  let message=req.flash('message-login');
  res.render('home',{title:"home",user:req.user,message:message});
}

let getSignUp = (req,res)=>{
  let message=req.flash('message-signup');
  console.log(`${message.includes("User")}`);
  res.render('signup',{title:'signup',message:message});
}

let uploadImage=(req,res)=>{
  res.send(req.file);
  console.log(req.files);
  console.log(req.file);
  // console.log(req.files);
}

module.exports={
  getHome,
  uploadImage,
  getLogin,
  getSignUp
}
