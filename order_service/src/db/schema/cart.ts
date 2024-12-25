import { create } from "domain";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const carts = pgTable('carts',{
    id:serial('id').primaryKey(),
    userId:integer('user_id').notNull(),
    updatedAt:timestamp('updated_at').notNull().defaultNow(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
})

export type Cart = InferSelectModel<typeof carts>