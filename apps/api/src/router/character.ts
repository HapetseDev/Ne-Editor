import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { Character as CharacterRow, PrismaClient } from "@prisma/client";
import {
  CHARACTER_SCHEMA_VERSION,
  characterSchema,
  createCharacterInputSchema,
  createEmptyCharacterData,
  updateCharacterInputSchema,
  type CharacterData,
} from "@ne/shared-types";
import { protectedProcedure, router } from "../trpc.js";

/**
 * Prisma types `data` as the recursive `Prisma.JsonValue` union. Feeding
 * that straight into tRPC's generics (on top of Zod's own generics) is what
 * causes "Type instantiation is excessively deep" errors, so every
 * procedure below narrows to our known `CharacterData` shape here and
 * declares an explicit `.output()` schema instead of inferring from Prisma.
 */
function serializeCharacter(character: CharacterRow) {
  return {
    id: character.id,
    name: character.name,
    schemaVersion: character.schemaVersion,
    createdAt: character.createdAt,
    updatedAt: character.updatedAt,
    data: character.data as CharacterData,
  };
}

async function requireOwnCharacter(db: PrismaClient, id: string, ownerId: string) {
  const character = await db.character.findUnique({ where: { id } });
  if (!character || character.ownerId !== ownerId) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Charakter nicht gefunden." });
  }
  return character;
}

export const characterRouter = router({
  list: protectedProcedure.output(z.array(characterSchema)).query(async ({ ctx }) => {
    const characters = await ctx.db.character.findMany({
      where: { ownerId: ctx.user.id },
      orderBy: { updatedAt: "desc" },
    });
    return characters.map(serializeCharacter);
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(characterSchema)
    .query(async ({ ctx, input }) => {
      const character = await requireOwnCharacter(ctx.db, input.id, ctx.user.id);
      return serializeCharacter(character);
    }),

  create: protectedProcedure
    .input(createCharacterInputSchema)
    .output(characterSchema)
    .mutation(async ({ ctx, input }) => {
      const character = await ctx.db.character.create({
        data: {
          ownerId: ctx.user.id,
          name: input.name,
          data: createEmptyCharacterData(),
          schemaVersion: CHARACTER_SCHEMA_VERSION,
        },
      });
      return serializeCharacter(character);
    }),

  update: protectedProcedure
    .input(updateCharacterInputSchema)
    .output(characterSchema)
    .mutation(async ({ ctx, input }) => {
      await requireOwnCharacter(ctx.db, input.id, ctx.user.id);
      const character = await ctx.db.character.update({
        where: { id: input.id },
        data: {
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.data !== undefined ? { data: input.data } : {}),
        },
      });
      return serializeCharacter(character);
    }),

  duplicate: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(characterSchema)
    .mutation(async ({ ctx, input }) => {
      const original = await requireOwnCharacter(ctx.db, input.id, ctx.user.id);
      const assets = await ctx.db.characterModelAsset.findMany({ where: { characterId: original.id } });

      const character = await ctx.db.character.create({
        data: {
          ownerId: ctx.user.id,
          name: `${original.name} (Kopie)`,
          data: original.data as object,
          schemaVersion: original.schemaVersion,
          modelAssets: {
            create: assets.map((asset) => ({
              storageKey: asset.storageKey,
              fileName: asset.fileName,
              isActive: asset.isActive,
            })),
          },
        },
      });
      return serializeCharacter(character);
    }),

  delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    await requireOwnCharacter(ctx.db, input.id, ctx.user.id);
    await ctx.db.character.delete({ where: { id: input.id } });
    return { ok: true };
  }),
});
