import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'email', placeholder: ' ' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      authorize: async (credentials: any) => {
        return { id: 'user 1' };
      },
    }),
  ],
};
