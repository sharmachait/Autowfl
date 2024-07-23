"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const workflow_1 = __importDefault(require("./routers/workflow"));
const app = (0, express_1.default)();
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/workflow', workflow_1.default);
app.listen(3001);
