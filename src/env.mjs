import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DIRECTUS_HOST: z.url(),
    DIRECTUS_API_KEY: z.string().min(1),
    NEXTAUTH_URL: z.url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "production"])
      .default("production"),
    KU_ALL_CLIENT_ID: z.string().min(1),
    KU_ALL_CLIENT_SECRET: z.string().min(1),
    KU_ALL_AUTH_ENDPOINT: z.url(),
    KU_ALL_TOKEN_ENDPOINT: z.url(),
    KU_ALL_USERINFO_ENDPOINT: z.url(),
    KU_ALL_WELL_KNOWN_URI: z.url(),
  },
  client: {
    NEXT_PUBLIC_KU_ALL_END_SESSION_ENDPOINT: z.url(),
  },
  runtimeEnv: {
    DIRECTUS_HOST: process.env.DIRECTUS_HOST,
    DIRECTUS_API_KEY: process.env.DIRECTUS_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    KU_ALL_CLIENT_ID: process.env.KU_ALL_CLIENT_ID,
    KU_ALL_CLIENT_SECRET: process.env.KU_ALL_CLIENT_SECRET,
    KU_ALL_AUTH_ENDPOINT: process.env.KU_ALL_AUTH_ENDPOINT,
    KU_ALL_TOKEN_ENDPOINT: process.env.KU_ALL_TOKEN_ENDPOINT,
    KU_ALL_USERINFO_ENDPOINT: process.env.KU_ALL_USERINFO_ENDPOINT,
    NEXT_PUBLIC_KU_ALL_END_SESSION_ENDPOINT: process.env.NEXT_PUBLIC_KU_ALL_END_SESSION_ENDPOINT,
    KU_ALL_WELL_KNOWN_URI: process.env.KU_ALL_WELL_KNOWN_URI,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
