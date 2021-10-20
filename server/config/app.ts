/* 
Assignment 1&2 John Tran 301165631 October 2021
*/

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// auth modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

import cors from 'cors';

// auth objects
let localStrategy = passportLocal.Strategy;
import User from '../models/user';

// flash
import flash from 'connect-flash';

// mongoose
import mongoose, {mongo} from 'mongoose';

// connect to index
import indexRouter from '../routes/index';
import businessRouter from '../routes/business';

const app = express();
export default app;

// mongo db
import * as DBconfig from './db';
mongoose.connect((DBconfig.RemoteURI) ? DBconfig.RemoteURI : DBconfig.LocalURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", function() 
{
  console.error ("Connection Error");
});

db.once("open", function()
{
    console.log(`Connected to MongoDB at: ${DBconfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

app.use(session({
  secret: DBconfig.Secret,
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/', businessRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
