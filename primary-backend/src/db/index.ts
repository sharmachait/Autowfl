import { PrismaClient } from '@prisma/client';
const globalObj = global as unknown as { prisma: PrismaClient };

export const prismaClient = globalObj.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalObj.prisma = prismaClient;

export default prismaClient;
