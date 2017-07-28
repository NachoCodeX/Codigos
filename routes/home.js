import HomeController from '../controllers/home';
import multer from 'multer';
const router = require('express').Router();
const isLoggedIn =require('../middlewares/isLoggedIn');
const isLoggedIn_2 =require('../middlewares/isLoggedIn_back');
import path from 'path';


module.exports = passport => {

  let uploading=multer({
    dest:path.join(__dirname,'..',"public","uploads")
  });

  router.get('/',isLoggedIn_2,HomeController.getLogin);

  router.post('/',passport.authenticate('login',{
    successRedirect:'/profile',
    failureRedirect:'/',
    failureFlash:true
  }));

  router.get('/signup',HomeController.getSignUp);

  router.post('/signup',passport.authenticate('signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup'
  }));

  router.get('/profile',isLoggedIn,HomeController.getHome);

  router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  });

  router.post('/picture/upload',uploading.single('image'),HomeController.uploadImage);



  // AUTH FACEBOOK
  router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));

  router.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect:'/profile',
    failureRedirect:'/'
  }));



  return router;


}
