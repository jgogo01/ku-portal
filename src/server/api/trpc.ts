import { initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

interface AppRouterContextOptions {
  req: Request | NextRequest;
  res?: Response;
  origin?: string;
}

export const createTRPCContext = async (opts: AppRouterContextOptions) => {
  let session = null;

  try {
    if (opts.req && typeof opts.req.headers !== 'undefined') {
      session = await getServerSession(authOptions);
    }
  } catch (error) {
    console.error("Failed to get session:", error);
    session = null;
  }

  return {
    session,
    req: opts.req,
    res: opts.res,
  };
};

type ContextType = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<ContextType>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        code: error.code,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error("Unauthorized: User session not found");
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user,
    },
  });
});
