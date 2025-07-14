import { createDirectus, rest, staticToken  } from '@directus/sdk';
import { env } from "@/env.mjs";

const directus = createDirectus(env.DIRECTUS_HOST ?? "localhost:8055")
    .with(rest({
        onRequest: (options) => ({ ...options, cache: 'no-store' }),
    }))
    .with(staticToken(env.DIRECTUS_API_KEY ?? ""));

export default directus;