"use strict";
/**
 * Assignment 2 John Tran 301165631 October 2021
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const business_1 = require("../controllers/business");
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.requireAuth = requireAuth;
router.get('/business-list', requireAuth, business_1.DisplayBusinessListPage);
router.get('/update', requireAuth, business_1.DisplayUpdatePage);
router.post('/update/:id', requireAuth, business_1.processUpdateContact);
router.get('/delete/:id', requireAuth, business_1.performDelete);
module.exports = router;
//# sourceMappingURL=business.js.map