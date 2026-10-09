import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { characterDataSchema } from "@ne/shared-types";
import { protectedProcedure, router } from "../trpc.js";
import { exportAdapters } from "../export/adapters.js";
const necotaExportSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    schemaVersion: z.number().int(),
    data: characterDataSchema,
});
export const exportRouter = router({
    necota: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .output(necotaExportSchema)
        .query(async ({ ctx, input }) => {
        const character = await ctx.db.character.findUnique({ where: { id: input.id } });
        if (!character || character.ownerId !== ctx.user.id) {
            throw new TRPCError({ code: "NOT_FOUND" });
        }
        return exportAdapters.necota.export(character);
    }),
});
