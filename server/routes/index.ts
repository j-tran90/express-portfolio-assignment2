/**
 * Assignment 2 John Tran 301165631 October 2021
 */

"use strict";

import express from 'express';
const router = express.Router();
export default router;

import {DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProjectsPage, DisplayRegisterPage, DisplayServicesPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage} from '../controllers/index';

/* GET page */
router.get('/', DisplayHomePage);

router.get('/home', DisplayHomePage);

router.get('/about', DisplayAboutPage);

router.get('/projects', DisplayProjectsPage);

router.get('/services', DisplayServicesPage);

router.get('/contact', DisplayContactPage);

router.get('/login', DisplayLoginPage);

router.post('/login', ProcessLoginPage);

router.get('/register', DisplayRegisterPage);

router.post('/register', ProcessRegisterPage);

router.get('/logout', ProcessLogoutPage);

//module.exports = router;