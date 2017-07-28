import config from './config';
import express from 'express';
import HomeRoutes from './routes/home';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import flash from 'connect-flash';
import expressValidator from 'express-validator';
// import multer from 'multer';
const app=express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  secret:config.SECRET_SESSION,
  resave:false,
  saveUninitialized:true,
}));



// app.use(require('./middlewares/isLoggedIn'));
const passport=require('./auth/passport')(app);
// My Middlewares


app.use('/',HomeRoutes(passport));


module.exports=app;
