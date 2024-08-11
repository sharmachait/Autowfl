import NextAuth from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;
