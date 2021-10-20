"use strict";
/*
Assignment 1&2 John Tran 301165631 October 2021
*/
let __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
let __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
let __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    let result = {};
    if (mod != null) for (let k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
let __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// auth modules
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const cors_1 = __importDefault(require("cors"));
// auth objects
let localStrategy = passport_local_1.default.Strategy;
const user_1 = __importDefault(require("../models/user"));
// flash
const connect_flash_1 = __importDefault(require("connect-flash"));
// mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// connect to index
const index_1 = __importDefault(require("../routes/index"));
const business_1 = __importDefault(require("../routes/business"));
const app = (0, express_1.default)();
exports.default = app;
// mongo db
const DBconfig = __importStar(require("./db"));
mongoose_1.default.connect((DBconfig.RemoteURI) ? DBconfig.RemoteURI : DBconfig.LocalURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose_1.default.connection;
db.on("error", function () {
    console.error("Connection Error");
});
db.once("open", function () {
    console.log(`Connected to MongoDB at: ${DBconfig.HostName}`);
});
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../node_modules')));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: DBconfig.Secret,
    saveUninitialized: false,
    resave: false
}));
app.use((0, connect_flash_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(user_1.default.createStrategy());
passport_1.default.serializeUser(user_1.default.serializeUser());
passport_1.default.deserializeUser(user_1.default.deserializeUser());
app.use('/', index_1.default);
app.use('/', business_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//module.exports = app;
//# sourceMappingURL=app.js.map