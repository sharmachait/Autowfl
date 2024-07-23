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
const kafkajs_1 = require("kafkajs");
const TOPIC = 'workflow-events';
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
});
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
                var _b;
                yield new Promise((resolve) => {
                    setTimeout(resolve, 5000);
                });
                console.log({
                    partition,
                    val: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                    offset: message.offset,
                    topic,
                });
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
worker();
