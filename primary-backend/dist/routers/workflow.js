"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const router = (0, express_1.Router)();
router.post('/', middleware_1.default, (req, res) => {
    console.log('create workflow');
});
router.get('/', middleware_1.default, (req, res) => {
    console.log('get workflows');
});
router.get('/:workflowId', middleware_1.default, (req, res) => {
    console.log(req.params.workflowId);
});
exports.default = router;
