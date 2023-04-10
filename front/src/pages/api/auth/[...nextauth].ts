import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { postLogin } from "src/features/auth/api/login";

function parseJwt<T>(token: string): T {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials-auth",
      type: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const user = await postLogin({
            email: credentials.email,
            password: credentials.password,
          });

          if (user) {
            const { username: email, sub: id } = parseJwt<{
              username: string;
              sub: number;
            }>(user.token);

            return { id, email, token: user.token };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (e) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.sub = Number(user.id);
        token.email = user.email;
        token.apiToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.sub;
        session.email = token.email;
        session.token = token.apiToken;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login", signOut: "/logout" },
  session: {
    maxAge: 60 * 60 * 24,
  },
};
export default NextAuth(authOptions);
