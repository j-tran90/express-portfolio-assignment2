/**
 * Assignment 2 John Tran 301165631 October 2021
 */

import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();
export default router;

import {DisplayBusinessListPage, DisplayUpdatePage, PerformDelete, ProcessUpdatePage} from '../controllers/business';

export function requireAuth(req: Request, res: Response, next: NextFunction)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
router.get('/business-list', requireAuth, DisplayBusinessListPage);

router.get('/update/:id', requireAuth, DisplayUpdatePage);

router.post('/update/:id', requireAuth, ProcessUpdatePage);

router.get('/delete/:id', requireAuth, PerformDelete);

//module.exports = router;