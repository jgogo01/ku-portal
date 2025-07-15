import { NextAuthOptions } from "next-auth/";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { KuAllCallback } from "@/types/KuAllCallback";
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  },

  providers: [
    {
      id: "kualllogin",
      name: "KU All Login",
      type: "oauth",
      idToken: true,
      authorization: {
        url: env.KU_ALL_AUTH_ENDPOINT,
        params: { scope: "basic openid" },
      },
      token: {
        url: env.KU_ALL_TOKEN_ENDPOINT,
      },
      userinfo: {
        url: env.KU_ALL_USERINFO_ENDPOINT,
      },
      
      clientId: env.KU_ALL_CLIENT_ID,
      clientSecret: env.KU_ALL_CLIENT_SECRET,
      checks: ["pkce", "state"],
      wellKnown: env.KU_ALL_WELL_KNOWN_URI,

      async profile(profile: KuAllCallback) {
        return {
          id: profile.userprincipalname,
          thainame: profile.thainame,
          type_persion: profile["type-person"],
          campus: profile.campus,
          faculty_id: profile["faculty-id"],
          major_id: profile["major-id"],
          o365: profile["office365-mail"],
          google: profile["google-mail"],
          mail: profile.mail,
        };
      },
    },
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.thainame = user.thainame;
        token.type_persion = user.type_persion;
        token.campus = user.campus;
        token.faculty_id = user.faculty_id || null;
        token.major_id = user.major_id || null;
        token.o365 = user.o365 || null;
        token.google = user.google || null;
        token.mail = user.mail || null;
      }
      if (account?.provider === "kualllogin" && account.id_token) {
        token.id_token = account.id_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.id_token = token.id_token || undefined;
      session.user.thainame = token.thainame;
      session.user.type_persion = token.type_persion;
      session.user.campus = token.campus;
      session.user.faculty_id = token.faculty_id || null;
      session.user.major_id = token.major_id || null;
      session.user.o365 = token.o365 || null;
      session.user.google = token.google || null;
      session.user.mail = token.mail || null;
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "kualllogin") {
        if (
          profile &&
          user.id &&
          user.thainame &&
          user.type_persion &&
          user.campus
        ) {
          return true;
        }
        return false;
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/`;
    },
  },

  debug: env.NODE_ENV === "development",
};
