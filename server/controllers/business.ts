/**
 * Assignment 2 John Tran 301165631 October 2021
 */

import express, {Request, Response, NextFunction} from 'express';

import passport from 'passport';
import Contacts from '../models/contacts';

export function DisplayUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Update Contact', page: 'update'  });
}

export function processUpdateContact(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id

    let updatedContact = new Contacts({
        name: String,
        email: String,
        phone: String
    });

    Contacts.updateOne({_id: id}, updatedContact, (err: any) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business-list');
        }
    });
}

export function performDelete(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.redirect('/business-list');
        }
    });
}

export function DisplayBusinessListPage(req: Request, res: Response, next: NextFunction): void
{
    // db
    Contacts.find(function(err, contactsCollection)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.render('index', { title: 'Business List', page: 'business-list', contacts: contactsCollection  });

  });
}



