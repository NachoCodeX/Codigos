import HomeController from '../controllers/home';
const router = require('express').Router();

router.get('/home',HomeController.getHome);

module.exports=router;
