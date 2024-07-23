"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    console.log('signup');
});
router.post('/signin', (req, res) => {
    console.log('signin');
});
router.get('/profile', middleware_1.default, (req, res) => {
    console.log('profile');
});
exports.default = router;
