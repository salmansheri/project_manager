import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import {
  accounts,
  sessions,
  verificationTokens,
  users,
} from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    // @ts-expect-error never mind
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid Credentials");
        }
        console.log(credentials);

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));
        console.log(user);
        if (!user || !user.email || !user.password) {
          throw new Error("Cannot find user");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});