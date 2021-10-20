"use strict";
/**
 * Assignment 2 John Tran 301165631 October 2021
 */
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformDelete = exports.ProcessUpdatePage = exports.DisplayUpdatePage = exports.DisplayBusinessListPage = void 0;
const contacts_1 = __importDefault(require("../models/contacts"));
// calls in contact db and renders to user
function DisplayBusinessListPage(req, res, next) {
    // db
    contacts_1.default.find(function (err, contactsCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Business List', page: 'business-list', contacts: contactsCollection, displayName: req.user ? req.user.displayName : '' });
    });
}
exports.DisplayBusinessListPage = DisplayBusinessListPage;
// directed to Update View
function DisplayUpdatePage(req, res, next) {
    let id = req.params.id;
    contacts_1.default.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('index', { title: 'Update Page', page: 'update', contacts: contactToEdit, displayName: req.user ? req.user.displayName : '' });
        }
    });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
// process any edit the user done in the Update View
function ProcessUpdatePage(req, res, next) {
    let id = req.params.id;
    let newContact = new contacts_1.default({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }, {
        collection: "contacts"
    });
    contacts_1.default.updateOne({ _id: id }, newContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-list');
        }
    });
}
exports.ProcessUpdatePage = ProcessUpdatePage;
// delete a contact upon user req
function PerformDelete(req, res, next) {
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
exports.PerformDelete = PerformDelete;
//# sourceMappingURL=business.js.map