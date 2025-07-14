import { protectedProcedure } from "@/server/api/trpc";
import z from "zod";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { TRPCError } from "@trpc/server";
import { LinkInterface } from "@/interfaces/Link";
import { CampusInterface } from "@/interfaces/Campus";
import { TypePersionInterface } from "@/interfaces/TypePerson";

interface CampusItem {
  Campus_id: CampusInterface;
}
interface TypePersonItem {
  TypePerson_id: TypePersionInterface;
}

export const getLink = protectedProcedure
  .input(
    z.object({
      id: z.string().optional(),
      limit: z.number().min(1).max(50).default(10).optional(),
    })
  )
  .query(async ({ input }): Promise<LinkInterface[]> => {
    try {
      const resLink = await directus.request(
        readItems("Link", {
          fields: [
            "id",
            "name",
            "url",
            "campus.Campus_id.id",
            "campus.Campus_id.name",
            "type_person.TypePerson_id.id",
            "type_person.TypePerson_id.name",
            "only_in",
            "date_created",
          ],
          limit: input.limit,
          sort: ["-date_created"],
          filter: input.id ? { id: input.id } : {},
        })
      );

      // Transform the response to match the LinkInterface
      const transformedData: LinkInterface[] = resLink.map(
        (link): LinkInterface => {
          return {
            id: link.id,
            name: link.name,
            url: link.url,
            only_in: link.only_in,
            date_created: link.date_created,
            campus: link.campus?.map(
              (campusItem: CampusItem): CampusInterface => ({
                id: campusItem.Campus_id.id,
                name: campusItem.Campus_id.name,
              })
            ),
            type_person: link.type_person?.map(
              (typeItem: TypePersonItem): TypePersionInterface => ({
                id: typeItem.TypePerson_id.id,
                name: typeItem.TypePerson_id.name,
              })
            ),
          };
        }
      );

      return transformedData;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to retrieve news articles. Please try again later.",
        cause: error,
      });
    }
  });
