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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const email_1 = require("./services/email");
const TOPIC = 'workflow-events';
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
});
const prismaClient = new client_1.PrismaClient();
function worker() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'worker' });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: TOPIC,
            fromBeginning: true,
        });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e;
                yield new Promise((resolve) => {
                    setTimeout(resolve, 5000);
                });
                if (!((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString())) {
                    return;
                }
                const parsedValue = JSON.parse((_c = message === null || message === void 0 ? void 0 : message.value) === null || _c === void 0 ? void 0 : _c.toString());
                const workflowRunId = parsedValue.workflowRunId;
                const stage = parseInt(parsedValue.stage);
                const workflowRunDetails = yield prismaClient.workflowRun.findFirst({
                    where: {
                        id: workflowRunId,
                    },
                    include: {
                        workflow: {
                            include: {
                                trigger: true,
                                actions: {
                                    include: {
                                        type: true,
                                    },
                                },
                            },
                        },
                    },
                });
                const actions = (_d = workflowRunDetails === null || workflowRunDetails === void 0 ? void 0 : workflowRunDetails.workflow) === null || _d === void 0 ? void 0 : _d.actions;
                if (!actions)
                    return;
                const currentAction = (_e = workflowRunDetails === null || workflowRunDetails === void 0 ? void 0 : workflowRunDetails.workflow) === null || _e === void 0 ? void 0 : _e.actions.find((x) => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log('Action not found');
                    return;
                }
                const workflowMetdata = workflowRunDetails.metadata;
                if (currentAction.type.id === 'email') {
                    yield email(currentAction, workflowMetdata);
                }
                else if (currentAction.type.id === 'send-sol') {
                    yield solana(currentAction, workflowMetdata);
                }
                const lastStage = actions.length - 1;
                if (stage !== lastStage) {
                    yield publish({ workflowRunId, stage: stage + 1 });
                }
                yield consumer.commitOffsets([
                    {
                        topic,
                        partition,
                        offset: '' + (parseInt(message.offset) + 1),
                    },
                ]);
            }),
        });
    });
}
function email(currentAction, workflowMetdata) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log('SendEmail()');
        const body = (0, parser_1.parse)((_a = currentAction.metadata) === null || _a === void 0 ? void 0 : _a.body, workflowMetdata);
        const email = (0, parser_1.parse)((_b = currentAction.metadata) === null || _b === void 0 ? void 0 : _b.email, workflowMetdata);
        console.log(yield (0, email_1.sendEmail)(email, body));
        console.log({ email, body });
    });
}
function solana(currentAction, workflowMetdata) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log('sendSol()');
        const amount = (0, parser_1.parse)((_a = currentAction.metadata) === null || _a === void 0 ? void 0 : _a.amount, workflowMetdata);
        const address = (0, parser_1.parse)((_b = currentAction.metadata) === null || _b === void 0 ? void 0 : _b.address, workflowMetdata);
        console.log({ amount, address });
    });
}
function publish(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        yield producer.connect();
        yield producer.send({
            topic: TOPIC,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });
    });
}
worker();
