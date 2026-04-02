import { router, createCallerFactory } from "./trpc";
import { essaysRouter } from "./routers/essays";
import { insightsRouter } from "./routers/insights";
import { researchRouter } from "./routers/research";
import { wargamingRouter } from "./routers/wargaming";
import { calendarRouter } from "./routers/calendar";
import { growthRouter } from "./routers/growth";

export const appRouter = router({
  essays: essaysRouter,
  insights: insightsRouter,
  research: researchRouter,
  wargaming: wargamingRouter,
  calendar: calendarRouter,
  growth: growthRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
