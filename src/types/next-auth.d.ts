import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      id_token?: string; // OAuth2 ID Token
      thainame: string;
      type_persion: string;
      campus: string;
      
      faculty_id?: string | null;
      major_id?: string | null;

      o365?: string | null;
      google?: string | null;
      mail?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    thainame: string;
    type_persion: string;
    campus: string;
    
    faculty_id?: string | null;
    major_id?: string | null;

    o365?: string | null;
    google?: string | null;
    mail?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    id_token?: string; // OAuth2 ID Token
    thainame: string;
    type_persion: string;
    campus: string;

    faculty_id?: string | null;
    major_id?: string | null;

    o365?: string | null;
    google?: string | null;
    mail?: string | null;
  }
}
