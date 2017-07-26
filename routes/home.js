import HomeController from '../controllers/home';
const router = require('express').Router();
const isLoggedIn =require('../middlewares/isLoggedIn');
const isLoggedIn_2 =require('../middlewares/isLoggedIn_back');


module.exports = passport => {

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

  return router;


}
