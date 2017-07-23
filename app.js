import express from 'express';
import HomeRoutes from './routes/home';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const app=express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
// Òwn Middlewares


app.use('/',HomeRoutes);


module.exports=app;
