/**
 * Assignment 2 John Tran Fall 2021
 */

import express, {Request, Response, NextFunction} from 'express';

import passport from 'passport';

import User from '../models/user';
import Contacts from '../models/contacts';
import { convertTypeAcquisitionFromJson } from 'typescript';


export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home'  });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about'  });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects'  });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services'  });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact'  });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Login', page: 'login'  });
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
  passport.authenticate('local', (err, user, info) =>
  {
    if(err)
    {
      console.error(err);
      return next(err);
    }
    if(!user)
    {
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }

    req.login(user, (err) => 
    {
      if(err)
      {
        console.error(err);
        return next(err);
      }

      console.log("Logged in Successfully");

      return res.redirect('/business-list');
    });
  })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Register', page: 'register'  });
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
  let newUser = new User
  ({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName
  });

  User.register(newUser, req.body.password, (err) => 
  {
    if(err)
    {
      console.error('Error: Inserting New User');
      if(err.name == "UserExistsError")
      {
        console.error('Error: User Already Exists');
      }
      req.flash('registerMessage', 'Registration Error');

      return res.redirect('/register');
    }
    return passport.authenticate('local')(req, res, () =>
    {
      return res.redirect('/business-list');
    });
  });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
  req.logOut();

  res.redirect('/login');
}