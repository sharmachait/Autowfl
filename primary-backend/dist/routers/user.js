"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const types_1 = require("../types");
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const parsedData = types_1.SignupSchema.safeParse({ username, password, name });
    if (!parsedData.success) {
        return res.status(411).send({ message: 'Incorrect inputs' });
    }
    const user = yield db_1.default.user.findFirst({
        where: {
            email: parsedData.data.username,
        },
    });
    if (user) {
        return res
            .status(403)
            .send({ message: 'An account with this email already exists' });
    }
    yield db_1.default.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
        },
    });
    return res.json({ message: 'Please verify your account' });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const parsedData = types_1.SigninSchema.safeParse({ username, password });
    if (!parsedData.success) {
        return res.status(411).send({ message: 'Incorrect inputs' });
    }
    const user = yield db_1.default.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        },
    });
    if (!user) {
        return res.status(403).send({ message: 'Incorrect credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.jwtSecret);
    res
        .cookie('token', token, { sameSite: 'none', secure: true })
        .status(201)
        .json({ id: user.id, username });
}));
router.get('/', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const user = yield db_1.default.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            email: true,
        },
    });
    return res.json({
        user,
    });
}));
exports.default = router;
