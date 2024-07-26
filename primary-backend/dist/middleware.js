"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var _a;
    let token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    console.log(Object.assign({}, req.cookies));
    if (!token) {
        return res.status(403).json({ msg: 'unauthorized' });
    }
    try {
        let payload = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        if (payload) {
            req.id = payload.id;
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({ msg: 'unauthorized' });
    }
}
exports.default = authMiddleware;