import { ACCOUNT, USER } from "@/data/db.js";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import mongoose from "mongoose";

// Github & Google providers create objects w/o createdAt or updatedAt attributes. How to fix??

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await USER.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      // if duplicate email b/c two auth forms use same email, resolve issue or set user to same user and account.userid to same userid
      if (isAllowedToSignIn) {
        if (!user?.hasOwnProperty("__v")) {
          // successfully converts OAuth user into mongoose user
          const _user: mongoose.Document = await USER.create({
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
          }); 
          const {_id, ...__user} = _user.toObject()
          await _user.deleteOne()
          Object.assign(user, {...__user})
          console.log(account?.provider,'user',user?.email,'added')
        }

        return true;
      } else {
        // Return false to display a default error message
        return true;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
