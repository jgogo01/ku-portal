import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

const handler = async (req: Request) => {
  try {
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: () => createTRPCContext({ req, res: new Response() }),
    });
  } catch (error) {
    console.error("tRPC Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET = handler;
export const POST = handler;
