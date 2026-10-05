import "server-only";

import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import type { AuthenticatedUser } from "@/features/rbac/types";
import { getDb } from "@/lib/db";

type TransactionWork<Result> = (
  transaction: Prisma.TransactionClient,
) => Promise<Result>;

export function withDatabaseRole<Result>(
  actor: AuthenticatedUser | null,
  work: TransactionWork<Result>,
  client: PrismaClient = getDb(),
): Promise<Result> {
  return client.$transaction(async (transaction) => {
    await transaction.$queryRaw`
      SELECT
        set_config('app.role', ${actor?.role ?? "ANONYMOUS"}, true),
        set_config('app.user_id', ${actor?.id ?? ""}, true)
    `;

    return work(transaction);
  });
}
