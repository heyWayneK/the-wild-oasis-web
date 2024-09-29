import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_lib/data-service";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [Google],
// });

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // middlewate.js nextAuth will call this for a boolean
    authorized({ auth, request }) {
      // !! same as if auth ? true || false
      // !! is called double negation opetator
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existinGuest = await getGuest(user.email);

        if (!existinGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      // id the guest ID from gutest table to the global session
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// These are imported into the route.js in api/auth/[...nextauth]
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
