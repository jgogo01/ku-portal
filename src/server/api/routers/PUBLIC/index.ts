import { createTRPCRouter } from "@/server/api/trpc";
import { getNews, getTypePerson } from "@/server/api/routers/PUBLIC/GET";

export const PUBLICRouter = createTRPCRouter({
  getNews,
  getTypePerson,
});
