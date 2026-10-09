import { router } from "../trpc.js";
import { authRouter } from "./auth.js";
import { characterRouter } from "./character.js";
import { exportRouter } from "./export.js";

export const appRouter = router({
  auth: authRouter,
  character: characterRouter,
  export: exportRouter,
});

export type AppRouter = typeof appRouter;
