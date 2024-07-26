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
const router = (0, express_1.Router)();
router.post('/', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.WorkflowCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({ message: 'Incorrect inputs.' });
    }
    const workflowId = yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const workflow = yield tx.workflow.create({
            data: {
                triggerId: '',
                userId: req.id,
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        typeId: x.availableActionId,
                        sortingOrder: index,
                    })),
                },
            },
        });
        const trigger = yield tx.trigger.create({
            data: {
                typeId: parsedData.data.availableTriggerId,
                workflowId: workflow.id,
            },
        });
        yield tx.workflow.update({
            where: {
                id: workflow.id,
            },
            data: {
                triggerId: trigger.id,
            },
        });
        return workflow.id;
    }));
    return res.json({ workflowId });
}));
router.get('/', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const workflows = yield db_1.default.workflow.findMany({
        where: { userId: id },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });
    return res.json({ workflows });
}));
router.get('/:workflowId', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const workflowId = req.params.workflowId;
    const workflows = yield db_1.default.workflow.findFirst({
        where: { id: workflowId, userId: id },
        include: {
            actions: {
                include: {
                    type: true,
                },
            },
            trigger: {
                include: {
                    type: true,
                },
            },
        },
    });
    return res.json({ workflows });
}));
router.get('/:workflowId', middleware_1.default, (req, res) => {
    console.log(req.params.workflowId);
});
exports.default = router;
