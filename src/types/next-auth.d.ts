import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      thainame: string;
      type_persion: string;
      campus: string;
      
      faculty_id?: string | null;
      major_id?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    thainame: string;
    type_persion: string;
    campus: string;
    
    faculty_id?: string | null;
    major_id?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    thainame: string;
    type_persion: string;
    campus: string;

    faculty_id?: string | null;
    major_id?: string | null;
  }
}
