"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const globalObj = global;
exports.prismaClient = globalObj.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalObj.prisma = exports.prismaClient;
exports.default = exports.prismaClient;
