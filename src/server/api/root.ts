import { createTRPCRouter } from '@/server/api/trpc';
import { PUBLICRouter } from './routers/PUBLIC';
import { PROTECTEDRouter } from './routers/PROTECTED';

 
export const appRouter = createTRPCRouter ({
  public: PUBLICRouter,
  protected: PROTECTEDRouter
});

export type AppRouter = typeof appRouter;