"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = exports.HostName = exports.RemoteURI = exports.LocalURI = void 0;
exports.LocalURI = "mongodb://localhost/list";
exports.RemoteURI = process.env.RemoteURII;
//export const RemoteURI = "mongodb+srv://john:2bRLK9GZX2jlaM0F@comp229-f2021.jlcqd.mongodb.net/list?retryWrites=true&w=majority";
exports.HostName = (process.env.RemoteURII) ? "remotehost" : "localhost";
exports.Secret = "someSecret";
//# sourceMappingURL=db.js.map