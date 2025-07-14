import { publicProcedure } from "@/server/api/trpc";
import z from "zod";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { TRPCError } from "@trpc/server";
import { NewsInterface } from "@/interfaces/News";
import { TypePersionInterface } from "@/interfaces/TypePerson";

export const getNews = publicProcedure
  .input(
    z.object({
      id: z.string().optional(),
      limit: z.number().min(1).max(50).default(3).optional(),
    })
  )
  .query(async ({ input }): Promise<NewsInterface[]> => {
    try {
      const resNews = await directus.request(
        readItems("News", {
          fields: ["id", "title", "content", "date_created"],
          limit: input.limit,
          sort: ["-date_created"],
          filter: input.id ? { id: input.id } : {},
        })
      );
      return resNews as NewsInterface[];
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to retrieve news articles. Please try again later.",
        cause: error,
      });
    }
  });

export const getTypePerson = publicProcedure
  .input(
    z.object({
      id: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    try {
      const resTypePerson = await directus.request(
        readItems("TypePerson", {
          fields: ["id", "name"],
          filter: input.id ? { id: input.id } : {},
        })
      );
      return resTypePerson as TypePersionInterface[];
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to retrieve type persons. Please try again later.",
        cause: error,
      });
    }
  });
