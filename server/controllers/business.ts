/**
 * Assignment 2 John Tran 301165631 October 2021
 */

import express, {Request, Response, NextFunction} from 'express';

import Contacts from '../models/contacts';

// calls in contact db and renders to user
export function DisplayBusinessListPage(req: Request, res: Response, next: NextFunction): void 
{
  // db
  Contacts.find(function (err, contactsCollection)
  {
    if (err) 
    {
      console.error(err);
      res.end(err);
    }

    res.render('index', {title: 'Business List', page: 'business-list', contacts: contactsCollection, displayName: req.user ? req.user.displayName: ''});

  });
}

// directed to Update View
export function DisplayUpdatePage(req: Request, res: Response, next: NextFunction): void
{
  let id = req.params.id;

  Contacts.findById(id, (err: any, contactToEdit: any) =>
  {
    if (err) 
    {
      console.log(err);
      res.end(err);
    } 
    else 
    {
      res.render('index', {title: 'Update Page', page: 'update', contacts: contactToEdit, displayName: req.user ? req.user.displayName: ''});

    }
  });
}

// process any edit the user done in the Update View
export function ProcessUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id

    let newContact = new Contacts
    ({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    },
    {
        collection: "contacts"
    });

    Contacts.updateOne({_id: id}, newContact, (err: any) => {
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

// delete a contact upon user req
export function PerformDelete(req: Request, res: Response, next: NextFunction): void
{
  let id = req.params.id;

  Contacts.remove({_id: id}, (err) =>
  {
    if (err)
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