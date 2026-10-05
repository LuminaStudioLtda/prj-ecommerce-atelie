import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL precisa estar configurada para acessar o banco.");
  }

  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
