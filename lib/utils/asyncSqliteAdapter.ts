import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/lib/database";
import {Adapter} from "@auth/core/adapters";
import {accounts} from "@/lib/schema/accounts";
import {users} from "@/lib/schema/users";
import {and, eq} from "drizzle-orm";

export function asyncSqliteAdapter(): Adapter {
    return {
        ...DrizzleAdapter(db as unknown as any), // TODO: remove UBER UNSAFE work around
        async getUserByAccount(providerAccountId) {
            const results = await db
                .select()
                .from(accounts)
                .leftJoin(users, eq(users.id, accounts.userId))
                .where(
                    and(
                        eq(accounts.provider, providerAccountId.provider),
                        eq(accounts.providerAccountId, providerAccountId.providerAccountId),
                    ),
                )
                .get();

            return results?.user ?? null;
        },
    };
}
