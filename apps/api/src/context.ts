import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { db } from "./db.js";
import { getUserFromRequest } from "./auth/session.js";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = await getUserFromRequest(req);
  return { db, user, req, res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
