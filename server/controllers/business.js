"use strict";
/**
 * Assignment 2 John Tran 301165631 October 2021
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayBusinessListPage = exports.performDelete = exports.processUpdateContact = exports.DisplayUpdatePage = void 0;
const contacts_1 = __importDefault(require("../models/contacts"));
function DisplayUpdatePage(req, res, next) {
    res.render('index', { title: 'Update Contact', page: 'update' });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
function processUpdateContact(req, res, next) {
    let id = req.params.id;
    let updatedContact = new contacts_1.default({
        name: String,
        email: String,
        phone: String
    });
    contacts_1.default.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-list');
        }
    });
}
exports.processUpdateContact = processUpdateContact;
function performDelete(req, res, next) {
    let id = req.params.id;
    contacts_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-list');
        }
    });
}
exports.performDelete = performDelete;
function DisplayBusinessListPage(req, res, next) {
    // db
    contacts_1.default.find(function (err, contactsCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Business List', page: 'business-list', contacts: contactsCollection });
    });
}
exports.DisplayBusinessListPage = DisplayBusinessListPage;
//# sourceMappingURL=business.js.map