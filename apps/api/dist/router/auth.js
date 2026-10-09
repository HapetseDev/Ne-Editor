import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../trpc.js";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { createSession, destroySession } from "../auth/session.js";
const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(200),
});
export const authRouter = router({
    register: publicProcedure.input(credentialsSchema).mutation(async ({ ctx, input }) => {
        const existing = await ctx.db.user.findUnique({ where: { email: input.email } });
        if (existing) {
            throw new TRPCError({ code: "CONFLICT", message: "E-Mail bereits registriert." });
        }
        const passwordHash = await hashPassword(input.password);
        const user = await ctx.db.user.create({
            data: { email: input.email, passwordHash },
        });
        await createSession(user.id, ctx.res);
        return { id: user.id, email: user.email };
    }),
    login: publicProcedure.input(credentialsSchema).mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({ where: { email: input.email } });
        if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort falsch." });
        }
        await createSession(user.id, ctx.res);
        return { id: user.id, email: user.email };
    }),
    logout: protectedProcedure.mutation(async ({ ctx }) => {
        await destroySession(ctx.req, ctx.res);
        return { ok: true };
    }),
    me: protectedProcedure.query(({ ctx }) => {
        return { id: ctx.user.id, email: ctx.user.email };
    }),
});
