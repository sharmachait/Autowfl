"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const workflow_1 = __importDefault(require("./routers/workflow"));
const trigger_1 = __importDefault(require("./routers/trigger"));
const action_1 = __importDefault(require("./routers/action"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.ClientUrl,
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/workflow', workflow_1.default);
app.use('/api/v1/trigger', trigger_1.default);
app.use('/api/v1/action', action_1.default);
app.listen(3001);
