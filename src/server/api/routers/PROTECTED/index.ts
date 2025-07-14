import { createTRPCRouter } from "@/server/api/trpc";
import { getLink } from "@/server/api/routers/PROTECTED/GET";

export const PROTECTEDRouter = createTRPCRouter({
    getLink,
});