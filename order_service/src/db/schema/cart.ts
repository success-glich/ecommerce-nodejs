import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const carts = pgTable('carts',{
    id:serial('id').primaryKey(), //* for db records
    userId:integer('user_id').notNull(),
    updatedAt:timestamp('updated_at').notNull().defaultNow(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
})

export type Cart = InferSelectModel<typeof carts>
export type NewCart = InferInsertModel<typeof carts>


export const cartLineItems = pgTable('cart_line_items',{
    id:serial('id').primaryKey(),//* for db records
    productId:integer('product_id').notNull(),
    cartId:integer('cart_id').references(()=>carts.id,{onDelete:'cascade'}),
    itemName: varchar("item_name").notNull(), // human readable
    variant: varchar("variant").default("small"), // Small // medium // big
    qty: integer("qty").notNull(),
    price: numeric("amount").notNull(), // amount in cents
    createdAt: timestamp("created_at").notNull().defaultNow(),
     updatedAt: timestamp("updated_at").notNull().defaultNow(),
 
});
export type CartLineItem = InferSelectModel<typeof cartLineItems>;

export const cartRelation = relations(carts,({many})=>({
    lineItems:many(cartLineItems)
}))

export const lineItemRelation = relations(cartLineItems,({one})=>({
    cart:one(carts,{fields:[cartLineItems.cartId],references:[carts.id]})
}))